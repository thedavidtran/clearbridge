import { useQuery } from "@tanstack/react-query";
import FounderAddButton from "./FounderAddButton";

import founderLib from "../../utils/founder.js";

const Founder = ({ companyId }) => {
  const founderQuery = useQuery({
    queryKey: ["founders", companyId],
    queryFn: () => {
      return fetch(`/founders?companyId=${companyId}`, {
        method: "GET",
      }).then(async (res) => {
        return res.json();
      });
    },
  });
  return (
    <div className="border space-x-4 p-2 my-2">
      <div className="flex flex-row">
        <h2 className="text-xl font-bold flex-grow">Founders</h2>
        <div className="flex-row-reverse">
          <FounderAddButton companyId={companyId} />
        </div>
      </div>
      <div className="flex flex-row">
        <div className="flex-grow">
          {founderQuery.isError ? (
            <div>Error</div>
          ) : founderQuery.isLoading ? (
            <div>Loading...</div>
          ) : (
            founderQuery.data.map((founder) => (
              <div key={founder.id}>
                {founderLib.getFounderSummaryCaption(founder)}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Founder;
