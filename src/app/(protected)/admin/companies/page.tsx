"use client";

import { IPaginate } from "@/src/components/paginate/paginate.interface";
import { getCompanies } from "@/src/services/api/endpoints/companies";
import { useEffect, useState } from "react";

export default function Companies() {
  const [dataList, setDataList] = useState([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [paginate, setPaginate] = useState<IPaginate>({
    perPage: 22,
    totalPages: 1,
    currentPage: 1,
  });

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const { data } = await getCompanies();
      setDataList(data);
    } catch (error) {
      console.error("error: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <section>
      <h3>Empresas</h3>
    </section>
  );
}
