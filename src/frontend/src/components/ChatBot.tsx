import type { ChatMessage } from "@/types/index";
import { COMPANY_CONTACT } from "@/types/index";
import { Bot, MessageCircle, Send, User, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const FAQ_QA: { id: string; question: string; answer: string }[] = [
  {
    id: "faq-services",
    question: "What services do you offer?",
    answer:
      "PDH Tech Consultancy offers a broad range of engineering services including CHP & Conveyors, Industrial Equipment design, Building & Structural Engineering, Pipeline & Trenchless Solutions, Urban Infrastructure, Pavement Management, Project Management Consultancy (PMC), and BOT/DBFO/PPP Advisory.",
  },
  {
    id: "faq-contact",
    question: "How can I contact PDH?",
    answer: `You can reach us by phone at ${COMPANY_CONTACT.phone} or email us at ${COMPANY_CONTACT.email}. You can also chat on WhatsApp using the button on this page.`,
  },
  {
    id: "faq-location",
    question: "Where is your office?",
    answer: `Our office is located at: ${COMPANY_CONTACT.address}. We operate from Bhilai, the steel city of Chhattisgarh, India.`,
  },
  {
    id: "faq-iso",
    question: "Is PDH ISO certified?",
    answer:
      "Yes! PDH Tech Consultancy is ISO 9001:2015 certified by CDG Certification. We are also registered under MSME (Government of India), Coal India, EPF, ESIC, and hold Workers Compensation Insurance.",
  },
  {
    id: "faq-projects",
    question: "How many projects have you completed?",
    answer:
      "We have successfully completed 50+ projects for 30+ clients since our founding in 2018. Our clients include reputed names like SAIL, Vedanta, SECL, Jindal, and Galaxy Infra.",
  },
  {
    id: "faq-about",
    question: "What is PDH?",
    answer:
      "PDH Tech Consultancy is a premier engineering and strategic consultancy firm founded in 2018, based in Bhilai, Chhattisgarh, India. We are your completing design with engineering partner — ISO 9001:2015 certified with 10+ professionals and 8+ years of experience.",
  },
];

const WELCOME_MSG: ChatMessage = {
  id: "msg-welcome",
  role: "bot",
  content:
    "Hello! 👋 I'm the PDH Tech Assistant. How can I help you today? You can ask me about our services, location, certifications, or anything about PDH Tech Consultancy.",
  timestamp: new Date(),
};

function genId() {
  return `msg-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

export function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME_MSG]);
  const [inputValue, setInputValue] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [open]);

  function handleFaqClick(faq: { question: string; answer: string }) {
    const userMsg: ChatMessage = {
      id: genId(),
      role: "user",
      content: faq.question,
      timestamp: new Date(),
    };
    const botMsg: ChatMessage = {
      id: genId(),
      role: "bot",
      content: faq.answer,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg, botMsg]);
  }

  function handleSend() {
    const trimmed = inputValue.trim();
    if (!trimmed) return;

    const userMsg: ChatMessage = {
      id: genId(),
      role: "user",
      content: trimmed,
      timestamp: new Date(),
    };

    // Simple keyword matching
    const lower = trimmed.toLowerCase();
    let answer = `Thank you for your question! For specific inquiries, please contact us directly at ${COMPANY_CONTACT.phone} or ${COMPANY_CONTACT.email}.`;

    for (const faq of FAQ_QA) {
      const kw = faq.question.toLowerCase();
      if (lower.includes("service") && kw.includes("service")) {
        answer = faq.answer;
        break;
      }
      if (lower.includes("contact") && kw.includes("contact")) {
        answer = faq.answer;
        break;
      }
      if (
        (lower.includes("where") ||
          lower.includes("location") ||
          lower.includes("address") ||
          lower.includes("office")) &&
        kw.includes("where")
      ) {
        answer = faq.answer;
        break;
      }
      if (
        (lower.includes("iso") ||
          lower.includes("certified") ||
          lower.includes("certification")) &&
        kw.includes("iso")
      ) {
        answer = faq.answer;
        break;
      }
      if (
        (lower.includes("project") ||
          lower.includes("complete") ||
          lower.includes("how many")) &&
        kw.includes("project")
      ) {
        answer = faq.answer;
        break;
      }
      if (
        (lower.includes("what is") ||
          lower.includes("about pdh") ||
          lower.includes("who are")) &&
        kw.includes("what is")
      ) {
        answer = faq.answer;
        break;
      }
    }

    const botMsg: ChatMessage = {
      id: genId(),
      role: "bot",
      content: answer,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg, botMsg]);
    setInputValue("");
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") handleSend();
  }

  const showFaqs = messages.length <= 1;

  return (
    <>
      {/* Chat toggle button — aligned left of WhatsApp button at same bottom level */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-5 right-[4.5rem] z-50 w-12 h-12 bg-primary text-primary-foreground rounded-full shadow-elevated flex items-center justify-center hover:bg-primary/90 transition-smooth"
        aria-label={open ? "Close chat assistant" : "Open chat assistant"}
        data-ocid="chatbot-toggle"
      >
        {open ? <X size={20} /> : <MessageCircle size={20} />}
      </button>

      {/* Chat window — opens above the toggle button */}
      {open && (
        <dialog
          open
          className="fixed bottom-[4.5rem] right-4 z-50 w-80 sm:w-96 bg-card border border-border rounded-2xl shadow-elevated flex flex-col overflow-hidden p-0 m-0"
          style={{ maxHeight: "70vh" }}
          aria-label="PDH Chat Assistant"
        >
          {/* Header */}
          <div className="bg-navy px-4 py-3 flex items-center gap-3">
            <div className="w-8 h-8 bg-accent-teal/20 rounded-full flex items-center justify-center">
              <Bot size={16} className="text-accent-teal" />
            </div>
            <div>
              <div className="font-body font-semibold text-sm text-inverse">
                PDH Assistant
              </div>
              <div className="text-[10px] text-inverse/60 font-body">
                Online · Replies instantly
              </div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="ml-auto text-inverse/60 hover:text-inverse transition-colors"
              aria-label="Close chat"
            >
              <X size={16} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3 min-h-0">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2 items-end ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
              >
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                    msg.role === "bot" ? "bg-primary/10" : "bg-navy/10"
                  }`}
                >
                  {msg.role === "bot" ? (
                    <Bot size={12} className="text-accent-teal" />
                  ) : (
                    <User size={12} className="text-muted-foreground" />
                  )}
                </div>
                <div
                  className={`max-w-[80%] rounded-2xl px-3 py-2.5 text-sm font-body leading-relaxed ${
                    msg.role === "bot"
                      ? "bg-muted text-foreground rounded-bl-sm"
                      : "bg-primary text-primary-foreground rounded-br-sm"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {/* FAQ suggestion chips */}
            {showFaqs && (
              <div className="flex flex-col gap-2 mt-1">
                <div className="text-xs text-muted-foreground font-body pl-8">
                  Quick questions:
                </div>
                {FAQ_QA.map((faq) => (
                  <button
                    type="button"
                    key={faq.id}
                    onClick={() => handleFaqClick(faq)}
                    className="ml-8 text-left text-xs bg-background border border-border rounded-lg px-3 py-2 hover:border-accent-teal/50 hover:bg-muted/30 transition-smooth font-body text-muted-foreground"
                    data-ocid={faq.id}
                  >
                    {faq.question}
                  </button>
                ))}
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="px-4 py-3 border-t border-border flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a message..."
              className="flex-1 min-w-0 bg-background border border-input rounded-lg px-3 py-2 text-sm font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              data-ocid="chatbot-input"
              aria-label="Chat message input"
            />
            <button
              type="button"
              onClick={handleSend}
              disabled={!inputValue.trim()}
              className="w-9 h-9 bg-primary text-primary-foreground rounded-lg flex items-center justify-center hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-smooth shrink-0"
              aria-label="Send message"
              data-ocid="chatbot-send"
            >
              <Send size={14} />
            </button>
          </div>
        </dialog>
      )}
    </>
  );
}
