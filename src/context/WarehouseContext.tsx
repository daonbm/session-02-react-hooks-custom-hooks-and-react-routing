import { createContext } from "react";
import type { CartContext } from "../types";

export const WarehouseContext = createContext<CartContext | null>(null);
