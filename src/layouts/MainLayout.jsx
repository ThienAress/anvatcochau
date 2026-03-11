import CartSidebar from "../components/CartSidebar";
function MainLayout({ children }) {
  return (
    <>
      {children}
      <CartSidebar />
    </>
  );
}

export default MainLayout;
