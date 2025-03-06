import { Network, TatumSDK, Ethereum } from "@tatumio/tatum";
import { useEffect, useState } from "react";

function Form() {
  const [inputValue, setInputValue] = useState(""); // State to hold the input value
  const [labelText, setLabelText] = useState(""); // State to hold the label text
  const [tatum, setTatum] = useState<Ethereum | null>(null);

  useEffect(() => {
    const initializeTatum = async () => {
      const tatumInstance = await TatumSDK.init<Ethereum>({
        network: Network.ETHEREUM,
        apiKey: { v4: import.meta.env.VITE_TATUM_API_KEY },
        verbose: true,
      });
      setTatum(tatumInstance);
    };

    initializeTatum();
  }, []);

  const handleButtonClick = async () => {

    if (!inputValue.trim()) {
      setLabelText("Please enter a valid Ethereum address.");
      return;
    }

    try {

      const balance = await tatum.address.getBalance({
        addresses: [inputValue],
      });

      if (balance.status === "ERROR") {
        setLabelText("Error fetching balance. Please check the address.");
        return;
      }

      const ethBalance = balance.data.find((asset) => asset.asset === "ETH");

      if (!ethBalance) {
        setLabelText("No ETH balance found for this address.");
      } else {
        setLabelText(`Balance: ${ethBalance.balance} ETH`);
      }
    } catch (error) {
      setLabelText("Failed to retrieve balance. Please try again.");
    }
  };

  const handleInputChange = (e: Event) => {
    const target = e.target as HTMLInputElement;
    setInputValue(target.value);
  };

  return (
    <div>
      <p>
        <input
          type="text"
          value={inputValue}
          onInput={handleInputChange}
          placeholder="Enter ETH wallet address to get balance"
          style={{ padding: "5px", width: "320px" }}
        />
      </p>
      <button onClick={handleButtonClick} style={{ padding: "5px" }}>
        Click Me
      </button>
      <p style={{ padding: "5px", fontSize: "16px", fontWeight: "bold" }}>
        {labelText}
      </p>
    </div>
  );
}

export default Form;
