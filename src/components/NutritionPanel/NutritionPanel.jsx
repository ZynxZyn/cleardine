import React, { useState } from 'react';
import './NutritionPanel.css';

const DAILY_REFERENCE = {
  calories: 2000,
  protein: 50,
  carbs: 275,
  fat: 78,
  fiber: 28,
};

const NutrientBar = ({ label, value, unit, max, color }) => {
  const pct = Math.min((value / max) * 100, 100);
  return (
    <div className="nutrient-bar-row">
      <div className="nutrient-bar-label">
        <span className="nutrient-name">{label}</span>
        <span className="nutrient-value">{value}{unit}</span>
      </div>
      <div className="nutrient-bar-track">
        <div
          className="nutrient-bar-fill"
          style={{ width: `${pct}%`, background: color }}
        />
      </div>
      <span className="nutrient-pct">{Math.round(pct)}%<span className="nutrient-adi"> AKG</span></span>
    </div>
  );
};

const NutritionPanel = ({ cart }) => {
  const [expanded, setExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState('total');

  if (!cart || cart.length === 0) return null;

  // Hitung total nutrisi dari semua item di keranjang (qty * nilai)
  const totals = cart.reduce(
    (acc, item) => {
      const qty = item.quantity || 1;
      const n = item.nutrition || {};
      return {
        calories: acc.calories + (item.calories || 0) * qty,
        protein:  acc.protein  + (n.protein  || 0) * qty,
        carbs:    acc.carbs    + (n.carbs    || 0) * qty,
        fat:      acc.fat      + (n.fat      || 0) * qty,
        fiber:    acc.fiber    + (n.fiber    || 0) * qty,
      };
    },
    { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0 }
  );

  const caloriePct = Math.round((totals.calories / DAILY_REFERENCE.calories) * 100);

  return (
    <div className={`nutrition-panel ${expanded ? 'nutrition-panel--open' : ''}`}>
      {/* Header toggle */}
      <button className="nutrition-toggle" onClick={() => setExpanded(v => !v)}>
        <div className="nutrition-toggle-left">
          <div>
            <span className="nutrition-toggle-title">Ringkasan Nutrisi</span>
            <span className="nutrition-toggle-sub">
              {Math.round(totals.calories)} kkal · {caloriePct}% AKG harian
            </span>
          </div>
        </div>
        <span className={`nutrition-chevron ${expanded ? 'up' : ''}`}>▾</span>
      </button>

      {expanded && (
        <div className="nutrition-body">
          {/* Tab switcher */}
          <div className="nutrition-tabs">
            <button
              className={`nutrition-tab ${activeTab === 'total' ? 'active' : ''}`}
              onClick={() => setActiveTab('total')}
            >
              Total Pesanan
            </button>
            <button
              className={`nutrition-tab ${activeTab === 'breakdown' ? 'active' : ''}`}
              onClick={() => setActiveTab('breakdown')}
            >
              Per Item
            </button>
          </div>

          {activeTab === 'total' && (
            <div className="nutrition-total">
              {/* Calorie ring summary */}
              <div className="calorie-summary">
                <div className="calorie-ring" style={{ '--pct': `${Math.min(caloriePct, 100)}` }}>
                  <div className="calorie-ring-inner">
                    <span className="calorie-num">{Math.round(totals.calories)}</span>
                    <span className="calorie-unit">kkal</span>
                  </div>
                </div>
                <div className="calorie-meta">
                  <p className="calorie-meta-text">
                    <strong>{caloriePct}%</strong> dari kebutuhan harian
                  </p>
                  <p className="calorie-meta-sub">
                    Referensi: {DAILY_REFERENCE.calories} kkal/hari
                  </p>
                  <div className={`calorie-badge ${caloriePct > 80 ? 'high' : caloriePct > 50 ? 'medium' : 'low'}`}>
                    {caloriePct > 80 ? '⚠️ Tinggi kalori' : caloriePct > 50 ? '✅ Cukup' : '💚 Rendah kalori'}
                  </div>
                </div>
              </div>

              {/* Macronutrient bars */}
              <div className="macro-bars">
                <NutrientBar
                  label="Protein"
                  value={Math.round(totals.protein)}
                  unit="g"
                  max={DAILY_REFERENCE.protein}
                  color="linear-gradient(90deg, #3b82f6, #6366f1)"
                />
                <NutrientBar
                  label="Karbohidrat"
                  value={Math.round(totals.carbs)}
                  unit="g"
                  max={DAILY_REFERENCE.carbs}
                  color="linear-gradient(90deg, #f59e0b, #ef4444)"
                />
                <NutrientBar
                  label="Lemak"
                  value={Math.round(totals.fat)}
                  unit="g"
                  max={DAILY_REFERENCE.fat}
                  color="linear-gradient(90deg, #ec4899, #f43f5e)"
                />
                <NutrientBar
                  label="Serat"
                  value={Math.round(totals.fiber)}
                  unit="g"
                  max={DAILY_REFERENCE.fiber}
                  color="linear-gradient(90deg, #10b981, #059669)"
                />
              </div>

              <p className="nutrition-disclaimer">
                * Berdasarkan Angka Kecukupan Gizi (AKG) 2000 kkal/hari
              </p>
            </div>
          )}

          {activeTab === 'breakdown' && (
            <div className="nutrition-breakdown">
              {cart.map(item => {
                const qty = item.quantity || 1;
                const n = item.nutrition || {};
                const itemCal = (item.calories || 0) * qty;
                return (
                  <div key={item.id} className="breakdown-item">
                    <div className="breakdown-item-header">
                      <span className="breakdown-item-name">{item.name}</span>
                      <span className="breakdown-qty">×{qty}</span>
                    </div>
                    <div className="breakdown-nutrient-row">
                      <div className="breakdown-nutrient">
                        <span className="breakdown-nutrient-val">{itemCal}</span>
                        <span className="breakdown-nutrient-label">kkal</span>
                      </div>
                      <div className="breakdown-nutrient">
                        <span className="breakdown-nutrient-val">{(n.protein || 0) * qty}g</span>
                        <span className="breakdown-nutrient-label">Protein</span>
                      </div>
                      <div className="breakdown-nutrient">
                        <span className="breakdown-nutrient-val">{(n.carbs || 0) * qty}g</span>
                        <span className="breakdown-nutrient-label">Karbo</span>
                      </div>
                      <div className="breakdown-nutrient">
                        <span className="breakdown-nutrient-val">{(n.fat || 0) * qty}g</span>
                        <span className="breakdown-nutrient-label">Lemak</span>
                      </div>
                      <div className="breakdown-nutrient">
                        <span className="breakdown-nutrient-val">{(n.fiber || 0) * qty}g</span>
                        <span className="breakdown-nutrient-label">Serat</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NutritionPanel;
