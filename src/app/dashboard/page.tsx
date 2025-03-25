"use client";

import { useEffect } from "react";

export default function Home() {
  const fetch = async () => {
    //teste de rota protegida
    try {
      console.log("entrei");
    } catch (error) {
      console.error("error: ", error);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  return (
    <section>
      <h3>Dashboard</h3>
    </section>
  );
}
