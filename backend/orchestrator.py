import os
import sys

# Ensure the project root is in the Python path for IDEs and runtime
current_dir = os.path.dirname(os.path.abspath(__file__))
parent_dir = os.path.dirname(current_dir)
if parent_dir not in sys.path:
    sys.path.insert(0, parent_dir)

from typing import TypedDict, List, Union, Annotated
from operator import add
from langgraph.graph import StateGraph, END  # type: ignore
from langchain_google_genai import ChatGoogleGenerativeAI  # type: ignore
from langchain_openai import ChatOpenAI  # type: ignore
from langchain_core.messages import HumanMessage, AIMessage, SystemMessage  # type: ignore
from dotenv import load_dotenv  # type: ignore

from backend.supabase_client import get_supabase_client  # type: ignore

# Load environment variables from root or local
if os.path.exists(".env.local"):
    load_dotenv(dotenv_path=".env.local")
elif os.path.exists("../.env.local"):
    load_dotenv(dotenv_path="../.env.local")
else:
    load_dotenv() # Fallback to standard .env

# Initialize LLM based on available keys
def get_llm():
    if os.environ.get("GROQ_API_KEY"):
        return ChatOpenAI(
            model="llama-3.3-70b-versatile", 
            openai_api_key=os.environ.get("GROQ_API_KEY"),
            openai_api_base="https://api.groq.com/openai/v1"
        )
    elif os.environ.get("GEMINI_API_KEY") or os.environ.get("GOOGLE_API_KEY"):
        return ChatGoogleGenerativeAI(
            model="gemini-1.5-flash", 
            google_api_key=os.environ.get("GEMINI_API_KEY") or os.environ.get("GOOGLE_API_KEY")
        )
    else:
        raise ValueError("No valid AI API key (GROQ_API_KEY or GEMINI_API_KEY/GOOGLE_API_KEY) found in .env.local")

llm = get_llm()

class AgentState(TypedDict):
    messages: Annotated[List[dict], add]
    conversation_id: str
    user_id: str
    analysis: str
    booking_requested: bool
    booking_details: dict

import json
import uuid

def medical_expert_node(state: AgentState):
    """Processes symptoms and prescription data to provide both analysis and consultation."""
    messages = state["messages"]
    print(f"Incoming Messages: {messages}")
    conv_id = state.get("conversation_id") or str(uuid.uuid4())
    
    system_prompt = f"""You are the 'AI MED-VOICE Specialist'—the world's most advanced AI medical orchestrator. 
    Your mission is to provide clinical-grade, high-precision diagnostic analysis and treatment protocols.

    ### OPERATIONAL LOGIC:
    1. CORE ARCHITECTURE: You are running on the 'MED-VOICE PRO' protocol (Core Model: Llama-3.3-70b (Groq), Orchestration: LangGraph, Vector DB: Pinecone, Backend: FastAPI/Python).
    2. IF Prescription Data is present (usually marked with '[Prescription/Report Data]'): Analyze medication names, dosages, and instructions. Cross-reference with symptoms to identify interactions or efficacy.
    3. IF Prescription Data is MISSING: Proceed with a high-precision symptom-based consultation. Ask clarifying questions about duration and severity.
    4. ZERO GENERALITY: You are STRICTLY FORBIDDEN from providing generic advice like 'Rest', 'Hydrate', or 'Consult a doctor' (as the UI already handles this). Every remedy must be an evidence-based clinical action (e.g., 'Acupressure LI4 for 3 minutes' instead of 'Relax').
    5. THE RULE OF THREE: You MUST return exactly 3 Home Remedies and exactly 3 Medical Treatments/OTC suggestions for every case.
    6. NO ERROR MENTION: Never mention that the 'prescription is missing'. Move straight to helping.

    ### CORE SPECIALIST REGISTRY:
    Internal Medicine, Cardiologist, Neurologist, Orthopedic Surgeon, Dermatologist, 
    Gastroenterologist, Pulmonologist, Oncologist, ENT Specialist, Pediatrician, 
    Gynecologist, Obstetrician, Urologist, Nephrologist, Endocrinologist, 
    Ophthalmologist, Psychiatrist, Dentist, Surgeon, General Physician.

    ### MANDATORY JSON STRUCTURE (STRICT BINDING):
    STRICT REQUIREMENT: You MUST ONLY output a single, flat JSON object. No preamble, no post-text.
    {{
        "specialty": "Exact Specialist Name",
        "analysis": "**Clinical Evaluation:** [Detailed analysis of symptoms and documents]\\n\\n**Diagnostic Insight:** [Specific underlying logic]",
        "home_remedies": [
            {{ "title": "Precision Clinical Action (e.g., R.I.C.E Protocol, Acupressure LI4)", "description": "Specific clinical methodology", "clinical_logic": "Explainable reason for selection" }},
            {{ "title": "Precision Clinical Action (e.g., Epsom salt soak)", "description": "Specific clinical methodology", "clinical_logic": "Explainable reason for selection" }},
            {{ "title": "Precision Clinical Action (e.g., Targeted contrast therapy)", "description": "Specific clinical methodology", "clinical_logic": "Explainable reason for selection" }}
        ],
        "medical_treatments": [
            {{ "title": "OTC/Clinical Protocol 1", "description": "Specific pharmaceutical guidance", "clinical_logic": "Explainable pharmaceutical rationale" }},
            {{ "title": "OTC/Clinical Protocol 2", "description": "Specific pharmaceutical guidance", "clinical_logic": "Explainable pharmaceutical rationale" }},
            {{ "title": "OTC/Clinical Protocol 3", "description": "Specific pharmaceutical guidance", "clinical_logic": "Explainable pharmaceutical rationale" }}
        ],
        "doctors": [],
        "chat_response": "Professional summary and clarifying questions for the user.",
        "booking_requested": false
    }}"""
    
    # Convert state messages to LangChain format
    lc_messages = [SystemMessage(content=system_prompt)]
    for msg in messages:
        if msg["role"] == "user":
            lc_messages.append(HumanMessage(content=msg["content"]))
        else:
            content = msg["content"]
            try:
                data = json.loads(content)
                content = data.get("chat_response", content)
            except:
                pass
            lc_messages.append(AIMessage(content=content))
            
    print(f"--- CALLING AI MODEL ---")
    response = llm.invoke(lc_messages)
    
    # Improved JSON extraction logic
    content = response.content.strip()
    try:
        # Look for the first '{' and last '}'
        start_idx = content.find('{')
        end_idx = content.rfind('}')
        if start_idx != -1 and end_idx != -1:
            json_part = content[start_idx:end_idx+1]
            data = json.loads(json_part)
        else:
            raise ValueError("No JSON boundaries found")
            
        # Handle key variations for resilience and Triple-Safety Logic
        analysis = data.get("analysis") or data.get("diagnosis", "")
        booking_requested = data.get("booking_requested", False)
        
        # Enforce structural guarantees
        data = {
            "specialty": data.get("specialty", "General Physician"),
            "analysis": analysis,
            "diagnosis": analysis,
            "home_remedies": data.get("home_remedies", data.get("remedies", [])),
            "medical_treatments": data.get("medical_treatments", data.get("treatments", [])),
            "doctors": data.get("doctors", []),
            "chat_response": data.get("chat_response", analysis),
            "booking_requested": booking_requested
        }
    except Exception as e:
        print(f"JSON Parse Exception (Fallback triggered): {e}")
        analysis = content
        booking_requested = "book" in content.lower()
        data = {
            "specialty": "General Physician",
            "analysis": analysis,
            "diagnosis": analysis,
            "home_remedies": [],
            "medical_treatments": [],
            "doctors": [],
            "chat_response": content,
            "booking_requested": booking_requested
        }
    
    return {
        "analysis": analysis,
        "booking_requested": booking_requested,
        "conversation_id": conv_id,
        "user_id": state.get("user_id"),
        "booking_details": state.get("booking_details", {}),
        "messages": [{"role": "assistant", "content": json.dumps(data)}]
    }

# Build Simplified Graph
workflow = StateGraph(AgentState)
workflow.add_node("expert", medical_expert_node)

workflow.set_entry_point("expert")
workflow.add_edge("expert", END)

orchestrator = workflow.compile()
