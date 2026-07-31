/** Status dapur — konsep awal: ikon + label status + estimasi menit */
export const KITCHEN_QUEUE = {
  normal: {
    icon: 'circleGreen',
    statusLabel: 'Normal',
    timeLabel: '±0 Menit',
    desc: 'Waktu penyajian sesuai estimasi menu',
    className: 'normal',
  },
  busy: {
    icon: 'circleYellow',
    statusLabel: 'Sibuk',
    timeLabel: '±10 Menit',
    desc: 'Waktu penyajian 5-10 menit dari estimasi',
    className: 'busy',
  },
  'very-busy': {
    icon: 'circleRed',
    statusLabel: 'Sangat Sibuk',
    timeLabel: '±20 Menit',
    desc: 'Waktu penyajian +15-20 menit dari estimasi',
    className: 'very-busy',
  },
};

export function getKitchenQueue(status = 'normal') {
  return KITCHEN_QUEUE[status] || KITCHEN_QUEUE.normal;
}

