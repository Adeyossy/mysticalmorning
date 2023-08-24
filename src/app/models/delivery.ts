export type Delivery = { // This holds logistics info only - no transactional info
  city: string;
  street: string;
  landmark: string; // Closest major landmark
  phone: number; // Your phone number we can call when we bring your order
  backup: number; // With whom can we drop your breakfast if you are not available?
  backupPhone: number; // Please provide their phone number
}