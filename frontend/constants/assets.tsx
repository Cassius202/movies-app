import { NavLink } from "./types"
import {HomeIcon, List, CheckSquare, Info, DollarSign} from 'lucide-react'

import batmanImage from '../public/batman.jpg'
import { BiMoney } from "react-icons/bi";

export const navLinks: NavLink[] = [
  {
    name: "Home",
    href: "/",
    icon: HomeIcon,
  },
  {
    name: "Watchlist",
    href: "/watchlist",
    icon: List,
  },
  {
    name: "Watched",
    href: "/watchlist?watched=true",
    icon: CheckSquare,
  },
  {
    name: "Rollover",
    href: "/rollover",
    icon: DollarSign,
  }
];

export const heroImages = ["https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1400&auto=format&fit=crop&q=90&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bW92aWV8ZW58MHx8MHx8fDA%3D",
"https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1500&auto=format&fit=crop&q=90&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8bW92aWV8ZW58MHx8MHx8fDA%3D",
"https://images.unsplash.com/photo-1518929458119-e5bf444c30f4?w=1200&auto=format&fit=crop&q=90&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDh8fG1vdmllfGVufDB8fDB8fHww",
batmanImage.src,
]

export const cssColors = [
  // --- BRAND & PRIMARY ACCENTS (90% Transparency / 10% Opacity) ---
  { 
    name: "Electric Indigo", 
    hex: "#4f46e51a", 
    rgb: "rgba(79, 70, 229, 0.1)", 
    cssName: "indigo" 
  },
  { 
    name: "Royal Blue", 
    hex: "#2563eb1a", 
    rgb: "rgba(37, 99, 235, 0.1)", 
    cssName: "royalblue" 
  },
  { 
    name: "Sky Blue", 
    hex: "#0ea5e91a", 
    rgb: "rgba(14, 165, 233, 0.1)", 
    cssName: "deepskyblue" 
  },
  { 
    name: "Teal Green", 
    hex: "#0d94881a", 
    rgb: "rgba(13, 148, 136, 0.1)", 
    cssName: "teal" 
  },
  { 
    name: "Seafoam Green", 
    hex: "#14b8a61a", 
    rgb: "rgba(20, 184, 166, 0.1)", 
    cssName: "mediumturquoise" 
  },

  // --- NEW ADDITIONS (90% Transparency / 10% Opacity) ---
  { 
    name: "Vivid Red", 
    hex: "#ef44441a", 
    rgb: "rgba(239, 68, 68, 0.1)", 
    cssName: "crimson" 
  },
  { 
    name: "Bright Orange", 
    hex: "#f973161a", 
    rgb: "rgba(249, 115, 22, 0.1)", 
    cssName: "darkorange" 
  },
  { 
    name: "Amber Yellow", 
    hex: "#f59e0b1a", 
    rgb: "rgba(245, 158, 11, 0.1)", 
    cssName: "amber" 
  },
  { 
    name: "Emerald Green", 
    hex: "#10b9811a", 
    rgb: "rgba(16, 185, 129, 0.1)", 
    cssName: "mediumseagreen" 
  },
  { 
    name: "Deep Purple", 
    hex: "#8b5cf61a", 
    rgb: "rgba(139, 92, 246, 0.1)", 
    cssName: "darkviolet" 
  }
];