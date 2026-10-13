import React from 'react';
import {
  ShoppingBag,
  ShoppingCart,
  Sparkles,
  Check,
  Heart,
  Star,
  Search,
  ArrowRight,
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  Plus,
  Minus,
  Trash2,
  MessageCircle,
  Phone,
  Share2,
  ShieldCheck,
  Truck,
  Ruler,
  RefreshCw,
  X,
  Menu,
  CheckCircle2,
  ExternalLink,
  Flame,
  Info,
  Layers,
  SlidersHorizontal,
  Copy,
  Eye,
  TrendingUp,
} from 'lucide-react';
import Svg, { Rect, Circle } from 'react-native-svg';

// Custom clean SVG Instagram Icon
export function Instagram({ size = 20, color = '#E1306C' }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Rect x="2" y="2" width="20" height="20" rx="5" stroke={color} strokeWidth="2" />
      <Circle cx="12" cy="12" r="4" stroke={color} strokeWidth="2" />
      <Circle cx="17.5" cy="6.5" r="1.5" fill={color} />
    </Svg>
  );
}

export {
  ShoppingBag,
  ShoppingCart,
  Sparkles,
  Check,
  Heart,
  Star,
  Search,
  ArrowRight,
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  Plus,
  Minus,
  Trash2,
  MessageCircle,
  Phone,
  Share2,
  ShieldCheck,
  Truck,
  Ruler,
  RefreshCw,
  X,
  Menu,
  CheckCircle2,
  ExternalLink,
  Flame,
  Info,
  Layers,
  SlidersHorizontal,
  Copy,
  Eye,
  TrendingUp,
};
