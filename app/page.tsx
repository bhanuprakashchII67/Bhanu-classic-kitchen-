"use client";

import { useMemo, useState } from "react";

type Tab = "Overview" | "Orders" | "Zomato" | "Swiggy" | "Settlements" | "Expenses" | "Reports" | "Settings";

const tabs: Tab[] = ["Overview", "Orders", "Zomato", "Swiggy", "Settlements", "Expenses", "Reports", "Settings"];

const orders = [
  { id: "#ZMT-10481", platform: "Zomato", time: "12:48 PM", customer: "Rahul K.", items: 3, gross: 640, discount: 80, fees: 112, net: 448, status: "Delivered" },
  { id: "#SWG-8821", platform: "Swiggy", time: "12:42 PM", customer: "Priya S.", items: 2, gross: 420, discount: 40, fees: 71, net: 309, status: "Delivered" },
  { id: "#ZMT-10480", platform: "Zomato", time: "12:31 PM", customer: "Arjun M.", items: 4, gross: 890, discount: 100, fees: 154, net: 636, status: "Preparing" },
  { id: "#SWG-8819", platform: "Swiggy", time: "12:18 PM", customer: "Sneha R.", items: 1, gross: 280, discount: 0, fees: 48, net: 232, status: "Picked up" },
  { id: "#ZMT-10477", platform: "Zomato", time: "11:56 AM", customer: "Kiran P.", items: 2, gross: 510, discount: 50, fees: 88, net: 372, status: "Delivered" },
  { id: "#SWG-8816", platform: "Swiggy", time: "11:44 AM", customer: "Vamsi N.", items: 3, gross: 730, discount: 60, fees: 125, net: 545, status: "Delivered" },
];

const expenses = [
  ["Raw materials", "Food & ingredients", 15400],
  ["Packaging", "Containers, bags & labels", 2900],
  ["Gas", "Kitchen LPG", 1800],
  ["Electricity", "Kitchen power", 3200],
  ["Salaries", "Kitchen staff", 7200],
  ["Rent", "Kitchen rent", 6500],
];

const settlements = [
  ["SET-260919-Z", "Zomato", "18 Sep 2026", 28460, 28310, "Reconciled"],
  ["SET-260918-S", "Swiggy", "18 Sep 2026", 22140, 22140, "Reconciled"],
  ["SET-260917-Z", "Zomato", "17 Sep 2026", 31220, 30980, "Review"],
  ["SET-260917-S", "Swiggy", "17 Sep 2026", 24890, 24890, "Reconciled"],
];

function money(value: number) {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(value);
}

function Icon({ name }: { name: string }) {
  const paths: Record<string, string> = {
    grid: "M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z",
    orders: "M5 4h14v16H5zM8 8h8M8 12h8M8 16h5",
    chart: "M4 19V5M4 19h17M8 16v-4M12 16V8M16 16v-7M20 16v-4",
    wallet: "M3 7h18v13H3zM3 7l2-3h14l2 3M15 13h4",
    receipt: "M6 3h12v18l-3-2-3 2-3-2-3 2zM9 8h6M9 12h6",
    settings: "M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-1.8 1.8-.1-.1a1.7 1.7 0 0 0-1.9-.3l-.4.2a1.7 1.7 0 0 0-1 1.5v.2h-2.6v-.2a1.7 1.7 0 0 0-1-1.5l-.4-.2a1.7 1.7 0 0 0-1.9.3l-.1.1-1.8-1.8.1-.1a1.7 1.7 0 0 0 .3-1.9l-.2-.4a1.7 1.7 0 0 0-1.5-1H5v-2.6h.2a1.7 1.7 0 0 0 1.5-1l.2-.4a1.7 1.7 0 0 0-.3-1.9l-.1-.1 1.8-1.8.1.1a1.7 1.7 0 0 0 1.9.3l.4-.2a1.7 1.7 0 0 0 1-1.5V5h2.6v.2a1.7 1.7 0 0 0 1 1.5l.4.2a1.7 1.7 0 0 0 1.9-.3l.1-.1 1.8 1.8-.1.1a1.7 1.7 0 0 0-.3 1.9l.2.4a1.7 1.7 0 0 0 1.5 1h.2v2.6h-.2a1.7 1.7 0 0 0-1.5 1z",
  };
  return <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d={paths[name] || paths.grid} /></svg>;
}

function Status({ value }: { value: string }) {
  return <span className={"status " + value.toLowerCase().replaceAll(" ", "-")}>{value}</span>;
}

export default function Home() {
  const [active, setActive] = useState<Tab>("Overview");
  const [period, setPeriod] = useState("Today");
  const [orderFilter, setOrderFilter] = useState("All");
  const [search, setSearch] = useState("");

  const filteredOrders = useMemo(() => orders.filter(o =>
    (orderFilter === "All" || o.platform === orderFilter) &&
    (o.id + o.customer).toLowerCase().includes(search.toLowerCase())
  ), [orderFilter, search]);

  const navIcon: Record<Tab, string> = {
    Overview: "grid", Orders: "orders", Zomato: "chart", Swiggy: "chart",
    Settlements: "wallet", Expenses: "receipt", Reports: "chart", Settings: "settings"
  };

  const renderOverview = () => (
    <>
      <section className="hero-grid">
        <div className="hero-card">
          <div className="hero-top"><span>Net profit</span><span className="positive">+12.8%</span></div>
          <div className="hero-number">{money(12450)}</div>
          <div className="hero-sub">After platform deductions and operating costs</div>
          <div className="profit-bars">{[42,58,49,66,61,75,88,72,93,81,96,90].map((h,i)=><span key={i} style={{height:h+"%"}} />)}</div>
          <div className="chart-labels"><span>1 Sep</span><span>Today</span></div>
        </div>
        <div className="quick-card">
          <div className="section-title">Today at a glance</div>
          <div className="quick-row"><span>Gross sales</span><b>{money(62400)}</b></div>
          <div className="quick-row"><span>Platform deductions</span><b>-{money(14950)}</b></div>
          <div className="quick-row"><span>Kitchen costs</span><b>-{money(35000)}</b></div>
          <div className="quick-row total"><span>Profit margin</span><b>19.9%</b></div>
        </div>
      </section>
      <section className="kpis">
        {[
          ["Orders", "147", "81 Zomato · 66 Swiggy", "+8.4%"],
          ["Gross sales", money(62400), "Before deductions", "+6.2%"],
          ["Net revenue", money(47450), "76.0% of gross", "+4.9%"],
          ["Avg. order value", money(424), "Across all platforms", "+2.1%"],
        ].map(([label,value,meta,change]) => <div className="kpi" key={label}><div className="kpi-head"><span>{label}</span><span className="positive">{change}</span></div><strong>{value}</strong><small>{meta}</small></div>)}
      </section>
      <section className="content-grid">
        <div className="panel">
          <div className="panel-head"><div><h2>Revenue trend</h2><p>Daily gross sales vs net revenue</p></div><span className="legend"><i /> Gross <i /> Net</span></div>
          <div className="area-chart"><div className="ylabels"><span>₹8k</span><span>₹6k</span><span>₹4k</span><span>₹2k</span><span>₹0</span></div><div className="chart-area">{[45,62,52,70,58,76,68,84,73,91,79,95,88].map((h,i)=><div className="chart-col" key={i}><span className="bar gross" style={{height:h+"%"}}/><span className="bar net" style={{height:(h*.73)+"%"}}/></div>)}</div></div>
          <div className="xlabels"><span>1</span><span>5</span><span>10</span><span>15</span><span>19</span></div>
        </div>
        <div className="panel">
          <div className="panel-head"><div><h2>Platform split</h2><p>Revenue contribution</p></div></div>
          <div className="donut-wrap"><div className="donut"><div><strong>₹62.4k</strong><small>gross sales</small></div></div></div>
          <div className="platform-list"><div><span className="dot z" />Zomato <b>55.8%</b></div><div><span className="dot s" />Swiggy <b>44.2%</b></div></div>
        </div>
      </section>
      <section className="panel">
        <div className="panel-head"><div><h2>Latest orders</h2><p>Most recent activity across both platforms</p></div><button className="text-btn" onClick={()=>setActive("Orders")}>View all →</button></div>
        <OrderTable rows={orders.slice(0,4)} />
      </section>
    </>
  );

  const renderOrders = () => (
    <section className="panel">
      <div className="panel-head"><div><h2>Orders</h2><p>Unified order feed from Zomato and Swiggy</p></div><button className="primary">Export</button></div>
      <div className="toolbar"><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search order or customer..." /><div className="segmented">{["All","Zomato","Swiggy"].map(x=><button key={x} className={orderFilter===x?"selected":""} onClick={()=>setOrderFilter(x)}>{x}</button>)}</div></div>
      <OrderTable rows={filteredOrders} />
    </section>
  );

  const renderPlatform = (platform: "Zomato"|"Swiggy") => {
    const isZ = platform === "Zomato";
    return <><section className="platform-hero"><div><span className={"platform-badge "+(isZ?"z-badge":"s-badge")}>{platform}</span><h2>{platform} performance</h2><p>Sales, deductions and settlement position</p></div><button className="primary">Connection settings</button></section><section className="kpis">{[["Orders",isZ?"81":"66","Today"],["Gross sales",isZ?money(34800):money(27600),"Today"],["Deductions",isZ?money(8240):money(6710),"Fees + discounts"],["Net revenue",isZ?money(26560):money(20890),"After deductions"]].map(([a,b,c])=><div className="kpi" key={a}><span>{a}</span><strong>{b}</strong><small>{c}</small></div>)}</section><section className="content-grid"><div className="panel"><div className="panel-head"><div><h2>Order activity</h2><p>Last 30 days</p></div></div><div className="mini-bars">{[38,48,44,57,61,55,72,68,78,74,88,82,94,86,92].map((h,i)=><span key={i} style={{height:h+"%"}} />)}</div></div><div className="panel"><h2>Deduction breakdown</h2><div className="rows"><div className="quick-row"><span>Commission / service fees</span><b>{money(isZ?5900:4800)}</b></div><div className="quick-row"><span>Payment / other fees</span><b>{money(isZ?1240:930)}</b></div><div className="quick-row"><span>Restaurant discounts</span><b>{money(isZ?1100:1000)}</b></div><div className="quick-row total"><span>Total deductions</span><b>{money(isZ?8240:6710)}</b></div></div></div></section></>;
  };

  const renderSettlements = () => <section className="panel"><div className="panel-head"><div><h2>Settlements</h2><p>Reconcile platform statements against bank credits</p></div><button className="primary">Import statement</button></div><div className="table-wrap"><table><thead><tr><th>Settlement</th><th>Platform</th><th>Date</th><th>Expected</th><th>Received</th><th>Difference</th><th>Status</th></tr></thead><tbody>{settlements.map(s=><tr key={s[0]}><td><b>{s[0]}</b></td><td>{s[1]}</td><td>{s[2]}</td><td>{money(s[3])}</td><td>{money(s[4])}</td><td>{s[3]-s[4] ? "-"+money(s[3]-s[4]) : money(0)}</td><td><Status value={s[5]} /></td></tr>)}</tbody></table></div></section>;

  const renderExpenses = () => <section className="panel"><div className="panel-head"><div><h2>Expenses</h2><p>Kitchen operating costs</p></div><button className="primary">+ Add expense</button></div><div className="expense-total"><span>Month to date</span><strong>{money(expenses.reduce((a,e)=>a+Number(e[2]),0))}</strong></div><div className="table-wrap"><table><thead><tr><th>Category</th><th>Description</th><th>Amount</th></tr></thead><tbody>{expenses.map(e=><tr key={String(e[0])}><td><b>{e[0]}</b></td><td>{e[1]}</td><td>{money(Number(e[2]))}</td></tr>)}</tbody></table></div></section>;

  const renderReports = () => <section className="content-grid"><div className="panel"><h2>Profit & loss</h2><p className="muted">Current period operating view</p><div className="rows report"><div className="quick-row"><span>Gross sales</span><b>{money(62400)}</b></div><div className="quick-row"><span>Platform deductions</span><b>-{money(14950)}</b></div><div className="quick-row"><span>Net revenue</span><b>{money(47450)}</b></div><div className="quick-row"><span>Food & packaging</span><b>-{money(18300)}</b></div><div className="quick-row"><span>Variable costs</span><b>-{money(1800)}</b></div><div className="quick-row"><span>Fixed operating costs</span><b>-{money(14900)}</b></div><div className="quick-row total"><span>Net profit</span><b>{money(12450)}</b></div></div></div><div className="panel"><h2>Cost structure</h2><p className="muted">Share of gross sales</p><div className="cost-meter"><span style={{width:"29%"}} /><span style={{width:"24%"}} /><span style={{width:"6%"}} /><span style={{width:"21%"}} /><span style={{width:"20%"}} /></div><div className="cost-legend"><span>Food 29%</span><span>Platform 24%</span><span>Packaging 6%</span><span>Fixed 21%</span><span>Profit 20%</span></div></div></section>;

  const renderSettings = () => <section className="panel settings"><h2>Kitchen settings</h2><p>These controls are ready for the real platform connections.</p>{["Kitchen profile","Zomato connection","Swiggy connection","Team & permissions","Profit calculation"].map((x,i)=><button key={x} className="setting-row" onClick={()=>{}}><span><b>{x}</b><small>{i===1||i===2?"Not connected":"Configure"}</small></span><span>→</span></button>)}</section>;

  return <div className="app-shell">
    <aside className="sidebar">
      <div className="brand"><div className="brand-mark">B</div><div><strong>Bhanu Classic</strong><span>Kitchen OS</span></div></div>
      <div className="workspace"><span className="workspace-dot"/>Main Kitchen <span>⌄</span></div>
      <nav>{tabs.map(tab=><button key={tab} className={active===tab?"nav-item active":"nav-item"} onClick={()=>setActive(tab)}><Icon name={navIcon[tab]} /><span>{tab}</span></button>)}</nav>
      <div className="sidebar-bottom"><div className="connection"><span className="live-dot"/> Integrations ready</div><div className="user"><div className="avatar">B</div><div><b>Owner</b><small>Admin</small></div></div></div>
    </aside>
    <main className="main">
      <header className="topbar"><div className="mobile-brand">Bhanu Classic</div><div className="top-actions"><button className="icon-btn">⌕</button><button className="icon-btn">◔</button><div className="top-avatar">B</div></div></header>
      <div className="page-head"><div><div className="breadcrumb">Kitchen / {active}</div><h1>{active === "Overview" ? "Good afternoon, Bhanu" : active}</h1><p>{active === "Overview" ? "Here’s what is happening with your kitchen today." : "Manage your kitchen operations from one place."}</p></div><div className="head-actions"><div className="period-select">{["Today","7 days","30 days"].map(x=><button key={x} className={period===x?"selected":""} onClick={()=>setPeriod(x)}>{x}</button>)}</div></div></div>
      {active==="Overview"&&renderOverview()}
      {active==="Orders"&&renderOrders()}
      {(active==="Zomato"||active==="Swiggy")&&renderPlatform(active)}
      {active==="Settlements"&&renderSettlements()}
      {active==="Expenses"&&renderExpenses()}
      {active==="Reports"&&renderReports()}
      {active==="Settings"&&renderSettings()}
    </main>
  </div>;
}

function OrderTable({ rows }: { rows: typeof orders }) {
  return <div className="table-wrap"><table><thead><tr><th>Order</th><th>Platform</th><th>Customer</th><th>Time</th><th>Gross</th><th>Net</th><th>Status</th></tr></thead><tbody>{rows.map(o=><tr key={o.id}><td><b>{o.id}</b></td><td><span className={"platform-mini "+(o.platform==="Zomato"?"z-text":"s-text")}>{o.platform}</span></td><td>{o.customer}<small className="cell-sub">{o.items} items</small></td><td>{o.time}</td><td>{money(o.gross)}</td><td><b>{money(o.net)}</b></td><td><Status value={o.status} /></td></tr>)}</tbody></table></div>;
}
