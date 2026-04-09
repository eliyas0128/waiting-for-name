import { Button } from "@/components/ui/button";
import { COMPANY_CONTACT } from "@/types/index";
import {
  Clock,
  ExternalLink,
  Mail,
  MapPin,
  Navigation,
  Phone,
} from "lucide-react";

const DIRECTIONS_URL =
  "https://www.google.com/maps/dir/?api=1&destination=Perfect+Designing+Hub,Bhilai,Chhattisgarh+490023,India";

export function ContactMap() {
  return (
    <section id="contact" className="scroll-mt-24 mb-16">
      <div className="mb-8">
        <div className="text-xs font-body font-semibold uppercase tracking-widest text-accent-teal mb-2">
          Contact Us
        </div>
        <h2 className="font-display font-bold text-2xl md:text-3xl text-foreground mb-3">
          Get in Touch
        </h2>
        <p className="font-body text-sm text-muted-foreground max-w-lg">
          We are based in Bhilai, Chhattisgarh. Reach us by phone, email, or
          visit our office.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Contact Info */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <div className="bg-card border border-border rounded-xl p-6 shadow-card">
            <h3 className="font-display font-bold text-base text-foreground mb-5">
              Contact Information
            </h3>
            <div className="flex flex-col gap-5">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                  <Phone size={16} className="text-accent-teal" />
                </div>
                <div>
                  <div className="font-body text-xs text-muted-foreground uppercase tracking-wide mb-0.5">
                    Phone
                  </div>
                  <a
                    href={`tel:${COMPANY_CONTACT.phone}`}
                    className="font-body font-semibold text-sm text-foreground hover:text-accent-teal transition-colors"
                    data-ocid="contact-phone"
                  >
                    {COMPANY_CONTACT.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                  <Mail size={16} className="text-accent-teal" />
                </div>
                <div>
                  <div className="font-body text-xs text-muted-foreground uppercase tracking-wide mb-0.5">
                    Email
                  </div>
                  <a
                    href={`mailto:${COMPANY_CONTACT.email}`}
                    className="font-body font-semibold text-sm text-foreground hover:text-accent-teal transition-colors break-all"
                    data-ocid="contact-email"
                  >
                    {COMPANY_CONTACT.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                  <MapPin size={16} className="text-accent-teal" />
                </div>
                <div>
                  <div className="font-body text-xs text-muted-foreground uppercase tracking-wide mb-0.5">
                    Address
                  </div>
                  <p className="font-body text-sm text-foreground leading-relaxed">
                    {COMPANY_CONTACT.address}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                  <Clock size={16} className="text-accent-teal" />
                </div>
                <div>
                  <div className="font-body text-xs text-muted-foreground uppercase tracking-wide mb-0.5">
                    Working Hours
                  </div>
                  <p className="font-body text-sm text-foreground">
                    Mon – Sat: 9:00 AM – 6:00 PM
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* WhatsApp CTA */}
          <a
            href="https://wa.me/917869091028"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 bg-[#25D366] hover:bg-[#20bb5a] text-white rounded-xl px-5 py-4 font-body font-semibold text-sm transition-smooth shadow-card"
            data-ocid="contact-whatsapp"
          >
            <svg
              viewBox="0 0 24 24"
              className="w-5 h-5 fill-current shrink-0"
              aria-hidden="true"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Chat on WhatsApp
          </a>
        </div>

        {/* Map */}
        <div className="lg:col-span-3">
          <div className="bg-card border border-border rounded-xl overflow-hidden shadow-card h-full min-h-64 flex flex-col">
            {/* Map header with Get Directions */}
            <div className="px-5 py-4 border-b border-border flex items-center justify-between gap-3 flex-wrap">
              <div className="flex items-center gap-2">
                <MapPin size={15} className="text-accent-teal" />
                <span className="font-body font-semibold text-sm text-foreground">
                  Bhilai, Chhattisgarh, India
                </span>
              </div>
              <Button
                asChild
                size="sm"
                data-ocid="contact-get-directions-btn"
                className="gap-2 font-body font-semibold text-xs"
              >
                <a
                  href={DIRECTIONS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Navigation size={13} />
                  Get Directions
                  <ExternalLink size={12} />
                </a>
              </Button>
            </div>
            <iframe
              src="https://www.openstreetmap.org/export/embed.html?bbox=81.36,21.19,81.44,21.23&layer=mapnik&marker=21.209,81.396"
              style={{ width: "100%", height: "350px", border: 0 }}
              loading="lazy"
              title="Perfect Solution Location – Bhilai, Chhattisgarh"
              aria-label="Map showing Perfect Solution office location in Bhilai"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
