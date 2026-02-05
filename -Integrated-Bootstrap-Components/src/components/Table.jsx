import React from "react";

const plans = [
  {
    name: "Basic",
    price: "$10",
    features: "Starter Pack",
  },
  {
    name: "Pro",
    price: "$25",
    features: "Advanced Features",
  },
  {
    name: "Enterprise",
    price: "$50",
    features: "All Access",
  },
];

export default function Table() {
  return (
    <div className="container py-5">
      <h3 className="mb-4 fw-bold text-center">Pricing Plans</h3>

      <div className="table-responsive">
        <table className="table table-bordered table-hover align-middle">
          <thead className="table-primary text-center">
            <tr>
              <th>Plan</th>
              <th>Price</th>
              <th>Features</th>
            </tr>
          </thead>

          <tbody className="text-center">
            {plans.map((plan, index) => (
              <tr key={index}>
                <td className="fw-semibold">{plan.name}</td>
                <td>{plan.price} / month</td>
                <td>{plan.features}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
