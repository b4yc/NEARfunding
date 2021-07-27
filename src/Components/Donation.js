import { Button } from "bootstrap";
import React from "react";
import { Card } from "react-bootstrap";

import Big from "big.js";
const BOATLOAD_OF_GAS = Big(4)
  .times(10 ** 13)
  .toFixed();

export default function Donation() {
  return (
    <div>
      <Card>Transaction</Card>
      <button
        onClick={() => {
          window.contract.clearBlockchain({}).then(() => {
            console.log("cleared");
          });
        }}
      >
        Clear blockchain
      </button>
    </div>
  );
}
