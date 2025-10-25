import Swal from "sweetalert2";

/**
 * 🔔 Alert: Product successfully added to cart
 */
export const addToCartAlert = (productName: string): void => {
  Swal.fire({
    title: "Added to Cart 🛒",
    text: `${productName} has been added successfully!`,
    icon: "success",
    showConfirmButton: false,
    timer: 1500,
    toast: true,
    position: "top-end",
    background: "#ad343e",
    color: "#fff",
  });
};

/**
 * 🔒 Alert: Login Required (Modal Style)
 */
export const loginPromptAlert = (onConfirm: () => void): void => {
  Swal.fire({
    title: "Login Required ⚠️",
    text: "You need to log in to continue.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Login Now",
    cancelButtonText: "Cancel",
    confirmButtonColor: "#ad343e",
    background: "#fff",
    color: "#ad343e",
  }).then((result) => {
    if (result.isConfirmed) {
      onConfirm();
    }
  });
};

/**
 * 💳 Alert: Checkout success
 */
export const checkoutSuccessAlert = (): void => {
  Swal.fire({
    title: "Checkout Successful 🎉",
    text: "Your order has been placed successfully!",
    icon: "success",
    showConfirmButton: false,
    timer: 3000,
    toast: true,
    background: "#fff",
    color: "#ad343e",
    confirmButtonText: "continue shopping",
  });
};

/**
 * ⚠️ Alert: Error during checkout or action
 */
export const errorAlert = (message: string): void => {
  Swal.fire({
    title: "Something went wrong 😞",
    text: message,
    icon: "error",
    confirmButtonColor: "#ad343e",
    toast: true,
    position: "top-end",
    timer: 3000,
  });
};

/**
 * ✅ Alert: Login Successful (Admin & User)
 */
export const loginSuccessAlert = (
  name: string,
  role: "admin" | "user",
  navigate: any
) => {
  Swal.fire({
    title: "✅ Login Successful!",
    text: role === "admin" ? `Welcome back, ${role}!` : `Welcome back, ${name}!`,
    icon: "success",
    showConfirmButton: false,
    timer: 2500,
    timerProgressBar: true,
    background: "#dce3e8",
    color: "#ad343e",
    confirmButtonColor: "#ad343e",
    didOpen: () => {
      const content = Swal.getHtmlContainer();
      if (content) content.style.fontSize = "1.1rem";
    },
  }).then(() => {
    if (role === "admin") navigate("/dashboard");
    else navigate("/home");
  });
};

/**
 * 🎉 Order success
 */
export const orderSuccessAlert = (navigate?: any) => {
  Swal.fire({
    icon: "success",
    title: "Order Placed! 🎉",
    text: "Your order has been placed successfully.",
    timer: 3000,
    showConfirmButton: false,
    timerProgressBar: true,
    background: "#dce3e8",
    color: "#ad343e",
    confirmButtonColor: "#ad343e",
  }).then(() => {
    if (navigate) {
      navigate("/home");
    } else {
      window.location.href = "/home";
    }
  });
};

/**
 * ❌ Delete confirmation
 */
export const deleteConfirmationAlert = (): Promise<boolean> => {
  return Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    color: "#ad343e",
    showCancelButton: true,
    confirmButtonColor: "#ad343e",
    cancelButtonColor: "#6c757d",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => result.isConfirmed);
};

/**
 * 🗑️ Alert: Item Deleted Successfully
 */
export const itemDeletedAlert = (): void => {
  Swal.fire({
    title: "Deleted! 🗑️",
    text: "The item has been deleted successfully.",
    icon: "success",
    timer: 1500,
    showConfirmButton: false,
    toast: true,
    position: "top-end",
    background: "#ad343e",
    color: "#fff",
  });
};

/**
 * ➕ Alert: Item Added Successfully
 */
export const itemAddedAlert = (): void => {
  Swal.fire({
    title: "Added! ✅",
    text: "The item has been added successfully.",
    icon: "success",
    timer: 1500,
    showConfirmButton: false,
    toast: true,
    position: "top-end",
    background: "#ad343e",
    color: "#fff",
  });
};
