"use client";

import { useState, useRef } from "react";
import styles from "./CreateStockDialog.module.css";

interface CreateRoomDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: () => void;
}

export default function CreateRoomDialog(props: CreateRoomDialogProps) {
  const [stockNameTaken, setStockNameTaken] = useState(false);
  const [invalidStockSym, setInvalidStockSym] = useState(false);

  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);

  if (props.isOpen && dialogRef.current) {
    if (dialogRef.current) {
      dialogRef.current.showModal(); // imperative DOM method
    }
  }

  function closeDialog() {
    if (dialogRef.current) {
      dialogRef.current.close();
      props.onClose(); // notify parent if needed
    }
  }

  async function createStock(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget); // event.currentTarget is the <form>

    const stockName = formData.get("stockName");
    const stockSym = formData.get("stockSym");

    closeDialog();
    console.log(formData);

    const res = await fetch("/api/stock", {
      method: "POST",
      body: JSON.stringify({ stockName, stockSym }),
    });

    const result = await res.json();

    console.log(result);

    if (formRef.current) {
      formRef.current.reset();
    }

    props.onCreate();
  }

  return (
    <dialog ref={dialogRef} className={styles.dialogContainer}>
      <form onSubmit={createStock} ref={formRef}>
        <div className={styles.inputContainer}>
          <label htmlFor="roomName">Stock Name</label>
          <input
            type="text"
            name="stockName"
            id="stockName"
            placeholder="stock name"
          />
          {stockNameTaken && (
            <p style={{ color: "red" }}>stock name already used</p>
          )}
          <label htmlFor="roomName">Stock Symbol</label>
          <input
            type="text"
            name="stockSym"
            id="stockSym"
            placeholder="stock symbol"
          />
          {invalidStockSym && (
            <p style={{ color: "red" }}>stock symbol does not exist</p>
          )}
        </div>

        <div className={styles.buttonsContainer}>
          <button type="submit">Create Stock</button>
          <p className={styles.closeButton} onClick={closeDialog}>
            Close
          </p>
        </div>
      </form>
    </dialog>
  );
}
