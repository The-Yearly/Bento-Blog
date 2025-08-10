"use client";

import {
  Mail,
  Phone,
  Instagram,
  Linkedin,
  MapPin,
  ExternalLink,
  Copy,
  Check,
} from "lucide-react";
import { useState } from "react";

interface ContactInfo {
  label: string;
  value: string;
  href?: string;
  type: "email" | "phone" | "social" | "text";
}

export default function ContactMe() {
  const [copiedItem, setCopiedItem] = useState<string | null>(null);

  const contactInfo: ContactInfo[] = [
    {
      label: "Email",
      value: "johnyohanskaria72@gmail.com",
      href: "mailto:johnyohanskaria72@gmail.com",
      type: "email",
    },
    {
      label: "Phone",
      value: "+91 6238699107",
      href: "tel:+916238699107",
      type: "phone",
    },
    {
      label: "Instagram",
      value: "@the_yearly",
      href: "https://www.instagram.com/_theyearly_",
      type: "social",
    },
    {
      label: "LinkedIn",
      value: "john-yohan",
      href: "https://www.linkedin.com/in/john-yohan",
      type: "social",
    },
    {
      label: "Location",
      value: "Kochi, Kerala",
      type: "text",
    },
  ];

  const getSpecificIcon = (label: string) => {
    switch (label.toLowerCase()) {
      case "instagram":
        return <Instagram className="w-5 h-5" />;
      case "linkedin":
        return <Linkedin className="w-5 h-5" />;
      case "email":
        return <Mail className="w-5 h-5" />;
      case "phone":
        return <Phone className="w-5 h-5" />;
      case "location":
        return <MapPin className="w-5 h-5" />;
      default:
        return <ExternalLink className="w-5 h-5" />;
    }
  };

  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedItem(label);
      setTimeout(() => setCopiedItem(null), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br relative overflow-hidden">
      <div className="relative z-10 flex items-center justify-center min-h-screen p-5">
        <div className="max-w-2xl w-full">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-20 h-2 rounded-full mb-8 shadow-2xl">
              <Mail className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white  mb-6 leading-tight">
              Get In Touch
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed max-w-xl mx-auto">
              I&apos;m a passionate developer who loves creating digital
              experiences and connecting with fellow creators.
            </p>
          </div>
          <div className="grid gap-4 md:gap-6">
            {contactInfo.map((contact, index) => (
              <div
                key={index}
                className="group relative p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 hover:bg-white/20 hover:border-white/30 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center justify-center w-12 h-12 bg-white/10 rounded-xl group-hover:bg-white/20 transition-all duration-300">
                      <div className="text-purple-300 group-hover:text-white transition-colors duration-300">
                        {getSpecificIcon(contact.label)}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-purple-300 mb-1 uppercase tracking-wider">
                        {contact.label}
                      </div>
                      <div className="text-white font-semibold text-lg group-hover:text-purple-100 transition-colors duration-300">
                        {contact.href ? (
                          <a
                            href={contact.href}
                            className="hover:text-purple-300 transition-colors duration-200 flex items-center gap-2"
                            target={
                              contact.type === "social" ? "_blank" : undefined
                            }
                            rel={
                              contact.type === "social"
                                ? "noopener noreferrer"
                                : undefined
                            }
                          >
                            {contact.value}
                            {contact.type === "social" && (
                              <ExternalLink className="w-4 h-4 opacity-60" />
                            )}
                          </a>
                        ) : (
                          contact.value
                        )}
                      </div>
                    </div>
                  </div>

                  {(contact.type === "email" || contact.type === "phone") && (
                    <button
                      onClick={() =>
                        copyToClipboard(contact.value, contact.label)
                      }
                      className="flex items-center justify-center w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg transition-all duration-300 hover:scale-110"
                      title={`Copy ${contact.label}`}
                    >
                      {copiedItem === contact.label ? (
                        <Check className="w-4 h-4 text-green-400" />
                      ) : (
                        <Copy className="w-4 h-4 text-gray-400 hover:text-white transition-colors duration-200" />
                      )}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
