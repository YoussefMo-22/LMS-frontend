type Props = {
  total: number;
  discountRate?: number;
  onCheckout: () => void;
};

export default function CartSummary({ total, discountRate = 0.25, onCheckout }: Props) {
  const discount = total * discountRate;
  const finalPrice = total - discount;

  return (
    <div className="border rounded-lg p-4 shadow-lg sticky top-4">
      <h3 className="text-lg font-semibold mb-4">Total</h3>
      <div className="space-y-2 text-sm text-gray-700">
        <div className="flex justify-between">
          <span>Original Price:</span>
          <span>${total.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-red-600">
          <span>25% Discount:</span>
          <span>- ${discount.toFixed(2)}</span>
        </div>
        <hr />
        <div className="flex justify-between font-semibold text-primary-500">
          <span>Total:</span>
          <span>${finalPrice.toFixed(2)}</span>
        </div>
      </div>
      <button
        onClick={onCheckout}
        className="w-full mt-6 bg-primary-400 text-white py-2 px-4 rounded-xl hover:bg-primary-500 transition"
      >
        Proceed to Checkout
      </button>
    </div>
  );
}
