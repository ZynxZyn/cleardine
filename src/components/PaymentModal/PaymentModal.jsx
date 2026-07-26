import React, { useState } from 'react';
import './PaymentModal.css';

const PAYMENT_METHODS = [
  {
    id: 'ovo',
    name: 'OVO',
    type: 'e-wallet',
    icon: null,
    logoSrc: '/images/logo-ovo.png',
    color: '#7c3aed',
    bgColor: 'rgba(124, 58, 237, 0.12)',
    borderColor: 'rgba(124, 58, 237, 0.35)',
    desc: 'Bayar dengan OVO Cash',
    badge: 'Cashback 10%',
  },
  {
    id: 'dana',
    name: 'DANA',
    type: 'e-wallet',
    icon: null,
    logoSrc: '/images/logo-dana.png',
    color: '#2563eb',
    bgColor: 'rgba(37, 99, 235, 0.12)',
    borderColor: 'rgba(37, 99, 235, 0.35)',
    desc: 'Bayar dengan saldo DANA',
    badge: null,
  },
  {
    id: 'bank',
    name: 'Transfer Bank',
    type: 'bank',
    icon: '🏦',
    logoSrc: null,
    color: '#0891b2',
    bgColor: 'rgba(8, 145, 178, 0.12)',
    borderColor: 'rgba(8, 145, 178, 0.35)',
    desc: 'BCA · Mandiri · BNI · BRI',
    badge: null,
  },
  {
    id: 'cash',
    name: 'Tunai (Cash)',
    type: 'cash',
    icon: '💵',
    logoSrc: null,
    color: '#16a34a',
    bgColor: 'rgba(22, 163, 74, 0.12)',
    borderColor: 'rgba(22, 163, 74, 0.35)',
    desc: 'Bayar langsung ke kasir',
    badge: 'Tersedia',
  },
];

const PaymentModal = ({ isOpen, onClose, onConfirm, totalAmount }) => {
  const [selected, setSelected] = useState(null);
  const [confirming, setConfirming] = useState(false);

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (!selected) return;
    setConfirming(true);
    setTimeout(() => {
      setConfirming(false);
      onConfirm(selected);
    }, 800);
  };

  const selectedMethod = PAYMENT_METHODS.find(m => m.id === selected);

  return (
    <div className="payment-overlay" onClick={onClose}>
      <div className="payment-sheet" onClick={e => e.stopPropagation()}>
        <div className="payment-handle" />

        <div className="payment-header">
          <h2 className="payment-title">Metode Pembayaran</h2>
          <button className="payment-close" onClick={onClose}>✕</button>
        </div>

        <div className="payment-amount-row">
          <span className="payment-amount-label">Total Tagihan</span>
          <span className="payment-amount-value">Rp {totalAmount.toLocaleString('id-ID')}</span>
        </div>

        <div className="payment-methods-list">
          <div className="payment-section-label">E-Wallet</div>
          {PAYMENT_METHODS.filter(m => m.type === 'e-wallet').map(method => (
            <button
              key={method.id}
              className={`payment-method-card ${selected === method.id ? 'selected' : ''}`}
              style={selected === method.id ? {
                background: method.bgColor,
                borderColor: method.borderColor,
              } : {}}
              onClick={() => setSelected(method.id)}
            >
              <div className="pm-icon-wrap" style={{ background: method.bgColor, border: `1px solid ${method.borderColor}` }}>
                {method.logoSrc ? (
                  <img src={method.logoSrc} alt={method.name} className="pm-logo-img" />
                ) : (
                  <span className="pm-icon">{method.icon}</span>
                )}
              </div>
              <div className="pm-info">
                <span className="pm-name">{method.name}</span>
                <span className="pm-desc">{method.desc}</span>
              </div>
              {method.badge && (
                <span className="pm-badge" style={{ color: method.color, background: method.bgColor, borderColor: method.borderColor }}>
                  {method.badge}
                </span>
              )}
              <div className={`pm-radio ${selected === method.id ? 'checked' : ''}`}
                style={selected === method.id ? { borderColor: method.color, background: method.color } : {}}>
                {selected === method.id && <span className="pm-radio-dot" />}
              </div>
            </button>
          ))}

          <div className="payment-section-label">Lainnya</div>
          {PAYMENT_METHODS.filter(m => m.type !== 'e-wallet').map(method => (
            <button
              key={method.id}
              className={`payment-method-card ${selected === method.id ? 'selected' : ''}`}
              style={selected === method.id ? {
                background: method.bgColor,
                borderColor: method.borderColor,
              } : {}}
              onClick={() => setSelected(method.id)}
            >
              <div className="pm-icon-wrap" style={{ background: method.bgColor, border: `1px solid ${method.borderColor}` }}>
                {method.logoSrc ? (
                  <img src={method.logoSrc} alt={method.name} className="pm-logo-img" />
                ) : (
                  <span className="pm-icon">{method.icon}</span>
                )}
              </div>
              <div className="pm-info">
                <span className="pm-name">{method.name}</span>
                <span className="pm-desc">{method.desc}</span>
              </div>
              {method.badge && (
                <span className="pm-badge" style={{ color: method.color, background: method.bgColor, borderColor: method.borderColor }}>
                  {method.badge}
                </span>
              )}
              <div className={`pm-radio ${selected === method.id ? 'checked' : ''}`}
                style={selected === method.id ? { borderColor: method.color, background: method.color } : {}}>
                {selected === method.id && <span className="pm-radio-dot" />}
              </div>
            </button>
          ))}
        </div>

        <div className="payment-footer">
          <button
            className={`payment-confirm-btn ${!selected ? 'disabled' : ''} ${confirming ? 'loading' : ''}`}
            onClick={handleConfirm}
            disabled={!selected || confirming}
          >
            {confirming ? (
              <span className="payment-spinner" />
            ) : selected ? (
              <>Bayar via {selectedMethod?.name} — Rp {totalAmount.toLocaleString('id-ID')}</>
            ) : (
              'Pilih Metode Pembayaran'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
