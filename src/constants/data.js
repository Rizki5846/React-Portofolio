export const skills = {
  "Web Development & IoT Dev": [
    { name: "HTML & CSS", level: 85 },
    { name: "JavaScript", level: 75 },
    { name: "React", level: 65 },
    { name: "PHP / Laravel", level: 80 },
    { name: "MySQL", level: 70 },
    { name: "IoT Monitroring", level: 90 },
    { name: "Mqtt Broker", level: 80 },

  ],
  "IT Support": [
    { name: "Troubleshooting Hardware", level: 85 },
    { name: "Networking (LAN/WiFi)", level: 80 },
    { name: "Windows Server", level: 70 },
    { name: "Linux (Ubuntu)", level: 65 },
    { name: "Ticketing & Helpdesk", level: 75 },
  ],
};

export const projects = [
  { 
    title: "E-Commerce Website", 
    tech: ["PHP", "MySQL", "Bootstrap"], 
    desc: "Toko online dengan fitur keranjang belanja, manajemen produk, dan sistem pembayaran dasar.", 
    type: "Web Dev", 
    emoji: "🛒", 
    color: "#3b82f6" 
  },
  { 
    title: "Company Profile Site", 
    tech: ["React", "Tailwind CSS"], 
    desc: "Website profil perusahaan responsif dengan animasi modern dan halaman layanan yang informatif.", 
    type: "Web Dev", 
    emoji: "🏢", 
    color: "#8b5cf6" 
  },
  { 
    title: "Network Setup & Dokumentasi", 
    tech: ["Cisco Packet Tracer", "Dokumentasi"], 
    desc: "Perancangan dan konfigurasi jaringan LAN untuk lab kampus dengan topologi star dan VLAN.", 
    type: "IT Support", 
    emoji: "🌐", 
    color: "#10b981" 
  },
  { 
    title: "Helpdesk Ticketing System", 
    tech: ["JavaScript", "LocalStorage"], 
    desc: "Aplikasi manajemen tiket IT support sederhana untuk mencatat, melacak, dan menyelesaikan isu pengguna.", 
    type: "Web Dev", 
    emoji: "🎫", 
    color: "#f59e0b" 
  },
];

export const navItems = [
  { id: "home", label: "HOME" },
  { id: "about", label: "ABOUT" },
  { id: "skills", label: "SKILLS" },
  { id: "projects", label: "PROJ" },
  { id: "contact", label: "CONTACT" },
];

export const contactInfo = [
  { ic: "✉️", label: "Email", val: "rizkiardiansyah584@gmail.com", link: "mailto:rizkiardiansyah584@gmail.com" },
  { ic: "💼", label: "LinkedIn", val: "https://www.linkedin.com/in/rizkiardiansyah02/", link: "https://www.linkedin.com/in/rizkiardiansyah02/" },
  { ic: "🐙", label: "GitHub", val: "https://github.com/Rizki5846", link: "https://github.com/Rizki5846" },
];

export const aboutInfo = {
  name: "Muhamad Rizki Ardiansyah",
  role: "Web Developer & IT Support",
  education: "S1 Teknik Informatika",
  location: "Cianjur, Indonesia",
  status: "Fresh Graduate",
  description: "Fresh graduate Teknik Informatika dengan passion di web development dan IT support. Terbiasa bekerja dengan teknologi web modern dan infrastruktur jaringan dasar.",
  belief: "Saya percaya teknologi yang baik adalah yang dapat diandalkan — baik dari sisi kode maupun infrastruktur."
};