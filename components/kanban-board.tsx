"use client";

import {
  KanbanComponent,
  ColumnsDirective,
  ColumnDirective,
} from "@syncfusion/ej2-react-kanban";
import "@syncfusion/ej2-base/styles/material.css";
import "@syncfusion/ej2-buttons/styles/material.css";
import "@syncfusion/ej2-layouts/styles/material.css";
import "@syncfusion/ej2-dropdowns/styles/material.css";
import "@syncfusion/ej2-inputs/styles/material.css";
import "@syncfusion/ej2-navigations/styles/material.css";
import "@syncfusion/ej2-popups/styles/material.css";
import "@syncfusion/ej2-react-kanban/styles/material.css";

import axios from "axios";
import { useEffect, useState } from "react";

export function KanbanBoard() {
  const api = "https://n8nnode.bestworks.cloud/webhook/react-dashboard";
  const api2 = "https://n8nnode.bestworks.cloud/webhook/lead-status-update";

  const [leadData, setLeadData] = useState<any[]>([]);
  const [reload, setReload] = useState<any[]>([]);
  const [kanbanWidth, setkanbanWidth] = useState<number>(0);

  // Fetch lead data
  useEffect(() => {
    axios
      .get(api)
      .then((res: any) => {
        console.log("res", res.data);
        // Transform Airtable-style schema → Kanban format
        const transformed = res.data.map((lead: any) => ({
          Id: lead.id,
          Title: lead["Lead Name"],
          Status: lead["Lead Status"] || "New Lead",
          Summary:
            lead.Notes ||
            (lead["Lead Summary (AI)"]?.value ?? "No summary available"),
          Company: lead["Company Name"],
          Email: lead.Email,
          Phone: lead.Phone,
          Industry: lead.Industry,
          Assignee: lead.Rep?.[0] || "Unassigned",
        }));
        setLeadData(transformed);
        // const kanbanWidth = columns.length * 320;
        setkanbanWidth(columns.length * 260)
      })
      .catch((err) => {
        console.error("err", err);
      });
  }, [reload]);

const handleStatusUpdate = (leadInfo: { id: string; email: string; status: string }) => {
  console.log("trigger",leadInfo)
  axios.post(api2, { id: leadInfo.id, email: leadInfo.email, status: leadInfo.status })
    .then(() => {
      alert("Status updated successfully")
      setReload([1])
      console.log("Status updated successfully");
    })
    .catch((error) => {
      console.error("Error updating status", error);
    });
};
  // Prevent incorrect drags
  // function onDragStart(args: any) {
  //   if (args.data.Status === "Closed Won" || args.data.Status === "Closed Lost") {
  //     args.cancel = true;
  //   }
  // }

function onDragStop(args: any) {
  // let cardData = Array.isArray(args.data) ? args.data : args.data;
 const cardData = Array.isArray(args.data) ? args.data[0] : args.data;
console.log('args',args)
  // If cardData.Status is already the target column status after drop

  if (!cardData) return;

  // Now call handleStatusUpdate with the updated status
  console.log('leadData.id',leadData)
  const find=leadData.find(x=>x.Id==args?.data[0]?.Id)
  console.log("find",find)
  if(find.Status != args?.data[0]?.Status){
    handleStatusUpdate({
    id: cardData.Id,
    email: cardData.Email,
    status: cardData.Status, // This is the new column after drop
  });
  }

  // Optional: Log to confirm
  console.log("DragDrop Status Update Triggered:", cardData);
}




  // Custom Card Template
  const cardTemplate = (props: any) => {
    return (
      <div className="e-card-content">
        <div className="e-card-header">
          <div className="e-card-header-caption">
            <div className="e-card-header-title font-semibold text-sm">
              {props.Title} <span className="text-gray-500">({props.Company})</span>
            </div>
            <div className="text-xs text-gray-500">{props.Industry}</div>
          </div>
        </div>
        <div className="e-card-content">
          <div className="text-sm text-gray-600 mb-2">{props.Email}</div>
          <div className="flex justify-between items-center">
            <div className="text-xs text-gray-500">{props.Phone}</div>
            {/* <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-xs font-medium text-gray-700">
              {props.Title?.split(" ")
                .map((n: string) => n[0])
                .join("")
                .slice(0, 2)
                .toUpperCase()}
            </div> */}
          </div>
        </div>
      </div>
    );
  };

  const columns = [
  { headerText: "🆕 New Lead", keyField: "New Lead" },
  { headerText: "❄️ Cold Lead", keyField: "Cold" },
  { headerText: "🎨Artwork Digitized", keyField: "Artwork Approved" },
  { headerText: "👌Artwork Submitted", keyField: "Artwork Submitted" },
  { headerText: "🔥 Warm Lead", keyField: "Warm" },
  { headerText: "🤝 Negotiation", keyField: "Negotiation" },
  { headerText: "📦 Sample Submitted", keyField: "Sample Sent" },
  { headerText: "🚚 Sample Shipped", keyField: "Sample Shipped" },
  { headerText: "🎁 Sample Delivered", keyField: "Sample Delivered" },
  { headerText: "✅ Closed Won", keyField: "Closed Won" },
  { headerText: "❌ Closed Lost", keyField: "Closed Lost" },

];



  return (
    // <div className="kanban-container p-6">
<div style={{ overflowX: "auto", width: "100%", whiteSpace: "nowrap" }}>
    <KanbanComponent
      id="kanban"
      keyField="Status"
      dataSource={leadData}
      // dragStart={onDragStart}
      dragStop={onDragStop}
      cardSettings={{
        contentField: "Summary",
        headerField: "Title",
        template: cardTemplate,
      }}
      style={{ width: `${kanbanWidth}px` }}
    >
      <ColumnsDirective>
        {columns.map(({ headerText, keyField }) => (
          <ColumnDirective key={keyField} headerText={headerText} keyField={keyField} />
        ))}
      </ColumnsDirective>
    </KanbanComponent>
  </div>
  );
}
