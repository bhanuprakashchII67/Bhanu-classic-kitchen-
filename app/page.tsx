const money = (value: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(value);

export default function Home() {
  const zomatoSales = 34800;
  const swiggySales = 27600;
  const zomatoDeductions = 8240;
  const swiggyDeductions = 6710;
  const restaurantDiscounts = 2100;
  const foodCost = 15400;
  const packaging = 2900;
  const variableOther = 1800;
  const fixedCosts = 12500;

  const grossSales = zomatoSales + swiggySales;
  const netPlatformRevenue = grossSales - zomatoDeductions - swiggyDeductions - restaurantDiscounts;
  const contribution = netPlatformRevenue - foodCost - packaging - variableOther;
  const netProfit = contribution - fixedCosts;

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <div className="brand">Bhanu Classic Kitchen<span>Profit dashboard</span></div>
        <nav className="nav">
          <div className="active">Overview</div>
          <div>Orders</div>
          <div>Zomato</div>
          <div>Swiggy</div>
          <div>Settlements</div>
          <div>Expenses</div>
          <div>Reports</div>
          <div>Settings</div>
        </nav>
      </aside>

      <main className="main">
        <header className="header">
          <div>
            <div className="eyebrow">Cloud kitchen control panel</div>
            <h1>Profit overview</h1>
            <p className="subtitle">Zomato + Swiggy orders, platform deductions and kitchen expenses.</p>
          </div>
          <div className="period">Today · 19 Sep 2026</div>
        </header>

        <section className="cards">
          <div className="card"><div className="label">Total orders</div><div className="value">147</div><div className="meta">81 Zomato · 66 Swiggy</div></div>
          <div className="card"><div className="label">Gross sales</div><div className="value">{money(grossSales)}</div><div className="meta">Before platform deductions</div></div>
          <div className="card"><div className="label">Net revenue</div><div className="value">{money(netPlatformRevenue)}</div><div className="meta">After platform deductions</div></div>
          <div className="card"><div className="label">Net profit</div><div className="value">{money(netProfit)}</div><div className="meta">After operating expenses</div></div>
        </section>

        <section className="grid">
          <div className="panel">
            <h2>Revenue and deductions</h2>
            <div className="rows">
              <div className="row"><span className="muted">Gross sales</span><strong>{money(grossSales)}</strong></div>
              <div className="row"><span className="muted">Zomato deductions</span><strong>-{money(zomatoDeductions)}</strong></div>
              <div className="row"><span className="muted">Swiggy deductions</span><strong>-{money(swiggyDeductions)}</strong></div>
              <div className="row"><span className="muted">Restaurant-funded discounts</span><strong>-{money(restaurantDiscounts)}</strong></div>
              <div className="divider" />
              <div className="row"><span><strong>Net platform revenue</strong></span><strong>{money(netPlatformRevenue)}</strong></div>
            </div>
          </div>

          <div className="panel">
            <h2>Kitchen expenses</h2>
            <div className="rows">
              <div className="row"><span className="muted">Food / raw materials</span><strong>-{money(foodCost)}</strong></div>
              <div className="row"><span className="muted">Packaging</span><strong>-{money(packaging)}</strong></div>
              <div className="row"><span className="muted">Gas / variable</span><strong>-{money(variableOther)}</strong></div>
              <div className="row"><span className="muted">Fixed operating costs</span><strong>-{money(fixedCosts)}</strong></div>
              <div className="divider" />
              <div className="row"><span><strong>Net profit</strong></span><strong>{money(netProfit)}</strong></div>
            </div>
          </div>
        </section>

        <section className="panel" style={{ marginTop: 16 }}>
          <h2>Platform performance</h2>
          <div className="platform">
            <div className="platform-card">
              <div className="platform-title">Zomato</div>
              <div className="platform-value">{money(zomatoSales)}</div>
              <div className="platform-meta">81 orders · {money(zomatoDeductions)} deductions</div>
            </div>
            <div className="platform-card">
              <div className="platform-title">Swiggy</div>
              <div className="platform-value">{money(swiggySales)}</div>
              <div className="platform-meta">66 orders · {money(swiggyDeductions)} deductions</div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
