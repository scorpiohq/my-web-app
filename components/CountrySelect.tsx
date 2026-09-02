"use client";

import { useEffect, useId, useMemo, useRef, useState, type KeyboardEvent } from "react";

const COUNTRIES = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "Andorra",
  "Angola",
  "Antigua and Barbuda",
  "Argentina",
  "Armenia",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bhutan",
  "Bolivia",
  "Bosnia and Herzegovina",
  "Botswana",
  "Brazil",
  "Brunei",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Cabo Verde",
  "Cambodia",
  "Cameroon",
  "Canada",
  "Central African Republic",
  "Chad",
  "Chile",
  "China",
  "Colombia",
  "Comoros",
  "Congo",
  "Costa Rica",
  "Croatia",
  "Cuba",
  "Cyprus",
  "Czechia",
  "Democratic Republic of the Congo",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Eritrea",
  "Estonia",
  "Eswatini",
  "Ethiopia",
  "Fiji",
  "Finland",
  "France",
  "Gabon",
  "Gambia",
  "Georgia",
  "Germany",
  "Ghana",
  "Greece",
  "Grenada",
  "Guatemala",
  "Guinea",
  "Guinea-Bissau",
  "Guyana",
  "Haiti",
  "Honduras",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Israel",
  "Italy",
  "Ivory Coast",
  "Jamaica",
  "Japan",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kiribati",
  "Kuwait",
  "Kyrgyzstan",
  "Laos",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Marshall Islands",
  "Mauritania",
  "Mauritius",
  "Mexico",
  "Micronesia",
  "Moldova",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Morocco",
  "Mozambique",
  "Myanmar",
  "Namibia",
  "Nauru",
  "Nepal",
  "Netherlands",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "North Korea",
  "North Macedonia",
  "Norway",
  "Oman",
  "Pakistan",
  "Palau",
  "Palestine",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines",
  "Poland",
  "Portugal",
  "Qatar",
  "Romania",
  "Russia",
  "Rwanda",
  "Saint Kitts and Nevis",
  "Saint Lucia",
  "Saint Vincent and the Grenadines",
  "Samoa",
  "San Marino",
  "Sao Tome and Principe",
  "Saudi Arabia",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Slovakia",
  "Slovenia",
  "Solomon Islands",
  "Somalia",
  "South Africa",
  "South Korea",
  "South Sudan",
  "Spain",
  "Sri Lanka",
  "Sudan",
  "Suriname",
  "Sweden",
  "Switzerland",
  "Syria",
  "Taiwan",
  "Tajikistan",
  "Tanzania",
  "Thailand",
  "Timor-Leste",
  "Togo",
  "Tonga",
  "Trinidad and Tobago",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Tuvalu",
  "Uganda",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom",
  "United States",
  "Uruguay",
  "Uzbekistan",
  "Vanuatu",
  "Vatican City",
  "Venezuela",
  "Vietnam",
  "Yemen",
  "Zambia",
  "Zimbabwe",
];

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      className="h-3.5 w-3.5 shrink-0"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M3.2 8.2 6.4 11.4 12.8 4.6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 16 16"
      className={`h-4 w-4 shrink-0 text-[#888] transition-transform ${open ? "rotate-180" : ""}`}
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M4 6.2 8 10.2 12 6.2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function CountrySelect({
  value,
  onChange,
  placeholder = "Select your country",
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  const listId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [highlight, setHighlight] = useState(0);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return COUNTRIES;
    return COUNTRIES.filter((country) => country.toLowerCase().includes(q));
  }, [query]);

  useEffect(() => {
    if (!open) return;

    const selectedIndex = filtered.findIndex((country) => country === value);
    setHighlight(selectedIndex >= 0 ? selectedIndex : 0);

    const timer = window.setTimeout(() => {
      searchRef.current?.focus();
      const selected = listRef.current?.querySelector("[data-selected='true']");
      selected?.scrollIntoView({ block: "center" });
    }, 0);

    return () => window.clearTimeout(timer);
  }, [open, filtered, value]);

  useEffect(() => {
    function onPointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
        setQuery("");
      }
    }

    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, []);

  function chooseCountry(country: string) {
    onChange(country);
    setOpen(false);
    setQuery("");
  }

  function onTriggerKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    // Enter with a value: let the form advance; don't reopen the list
    if (event.key === "Enter" && value) return;

    if (event.key === "ArrowDown" || event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setOpen(true);
    }
  }

  function onSearchKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setHighlight((index) =>
        filtered.length === 0 ? 0 : (index + 1) % filtered.length,
      );
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      setHighlight((index) =>
        filtered.length === 0
          ? 0
          : index === 0
            ? filtered.length - 1
            : index - 1,
      );
      return;
    }

    if (event.key === "Enter" && filtered[highlight]) {
      event.preventDefault();
      chooseCountry(filtered[highlight]);
      return;
    }

    if (event.key === "Escape") {
      setOpen(false);
      setQuery("");
    }
  }

  useEffect(() => {
    if (!open) return;
    const item = listRef.current?.querySelector("[data-highlighted='true']");
    item?.scrollIntoView({ block: "nearest" });
  }, [highlight, open]);

  return (
    <div
      ref={rootRef}
      className="relative w-full max-w-md"
      data-country-select=""
      data-open={open ? "true" : "false"}
    >
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        onKeyDown={onTriggerKeyDown}
        className="flex w-full items-center justify-between border-0 border-b border-[#FFA126] bg-transparent py-2 text-left text-xl outline-none transition-[border-color] duration-500 focus:border-[#FF8C00] sm:text-2xl"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
      >
        <span className={value ? "text-black" : "font-light text-[#FFD4A8]"}>
          {value || placeholder}
        </span>
        <ChevronIcon open={open} />
      </button>

      {open && (
        <div className="absolute left-0 right-0 top-[calc(100%+10px)] z-30 overflow-hidden rounded-2xl bg-white shadow-[0_12px_40px_rgba(0,0,0,0.16)]">
          <div className="border-b border-black/5 px-3 py-2.5">
            <input
              ref={searchRef}
              type="text"
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setHighlight(0);
              }}
              onKeyDown={onSearchKeyDown}
              placeholder="Search country"
              className="w-full bg-transparent text-sm text-black outline-none placeholder:text-[#999]"
            />
          </div>

          <ul
            ref={listRef}
            id={listId}
            role="listbox"
            className="max-h-72 overflow-auto py-1.5"
          >
            {filtered.length === 0 && (
              <li className="px-4 py-3 text-sm text-[#888]">No countries found</li>
            )}

            {filtered.map((country, index) => {
              const selected = country === value;
              const highlighted = index === highlight;

              return (
                <li key={country} role="option" aria-selected={selected}>
                  <button
                    type="button"
                    data-selected={selected}
                    data-highlighted={highlighted}
                    className={`flex w-full items-center gap-3 px-4 py-2.5 text-left text-[15px] ${
                      highlighted ? "bg-[#EDE7F6] text-black" : "bg-white text-black"
                    }`}
                    onMouseEnter={() => setHighlight(index)}
                    onMouseDown={(event) => {
                      event.preventDefault();
                      chooseCountry(country);
                    }}
                  >
                    <span className="flex h-4 w-4 shrink-0 items-center justify-center text-black">
                      {selected ? <CheckIcon /> : null}
                    </span>
                    {country}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
