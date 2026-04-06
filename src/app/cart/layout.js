export const metadata = {
  title: "Shopping Cart",
  description: "Review and manage your selected wood cold-pressed oils before proceeding to checkout.",
  robots: { index: false, follow: true } // Don't index empty carts or user sessions
};

export default function CartLayout({ children }) {
  return <>{children}</>;
}
