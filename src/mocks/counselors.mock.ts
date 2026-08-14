import { Counselor } from '@/types/counselor.types';

const splitName = (name: string) => {
  const [firstName, ...rest] = name.split(' ');
  return { firstName, lastName: rest.join(' ') };
};

const raw: Array<Pick<Counselor, 'id' | 'counselorId' | 'name' | 'mobile' | 'email' | 'createdAt'>> = [
  { id: 'cns-001', counselorId: 'C001', name: 'Anil Iyer', mobile: '9819093786', email: 'anil.iyer1@outlook.com', createdAt: '2026-01-15' },
  { id: 'cns-002', counselorId: 'C002', name: 'Mahesh Pillai', mobile: '9189555979', email: 'mahesh.pillai2@rediffmail.com', createdAt: '2026-01-16' },
  { id: 'cns-003', counselorId: 'C003', name: 'Hema Kurup', mobile: '9034236671', email: 'hema.kurup3@yahoo.com', createdAt: '2026-01-18' },
  { id: 'cns-004', counselorId: 'C004', name: 'Girish Bhat', mobile: '9995289078', email: 'girish.bhat4@rediffmail.com', createdAt: '2026-01-20' },
  { id: 'cns-005', counselorId: 'C005', name: 'Manoj Chacko', mobile: '9121547280', email: 'manoj.chacko5@yahoo.com', createdAt: '2026-01-22' },
  { id: 'cns-006', counselorId: 'C006', name: 'Omana Iyer', mobile: '9373537990', email: 'omana.iyer6@rediffmail.com', createdAt: '2026-01-25' },
  { id: 'cns-007', counselorId: 'C007', name: 'Jaya Prasad', mobile: '9975288200', email: 'jaya.prasad7@gmail.com', createdAt: '2026-02-01' },
  { id: 'cns-008', counselorId: 'C008', name: 'Umesh Devan', mobile: '9682828807', email: 'umesh.devan8@yahoo.com', createdAt: '2026-02-03' },
  { id: 'cns-009', counselorId: 'C009', name: 'Rajesh Prasad', mobile: '9898347887', email: 'rajesh.prasad9@hotmail.com', createdAt: '2026-02-05' },
  { id: 'cns-010', counselorId: 'C010', name: 'Kala Krishna', mobile: '9326865635', email: 'kala.krishna10@outlook.com', createdAt: '2026-02-10' },
  { id: 'cns-011', counselorId: 'C011', name: 'Sanjay Sen', mobile: '9514026140', email: 'sanjay.sen11@gmail.com', createdAt: '2026-02-12' },
  { id: 'cns-012', counselorId: 'C012', name: 'Radhika Pillai', mobile: '9008838737', email: 'radhika.pillai12@gmail.com', createdAt: '2026-02-14' },
  { id: 'cns-013', counselorId: 'C013', name: 'Sunil Namboodiri', mobile: '9493407224', email: 'sunil.namboodiri13@rediffmail.com', createdAt: '2026-02-15' },
];

// Still mock-backed: used by project.service.ts's wizard-era `validateCounselors`
// helper, which hasn't been rebound to the real Counsellors API yet.
export const mockCounselors: Counselor[] = raw.map(c => ({
  ...c,
  ...splitName(c.name),
  instituteId: 'inst-mock',
  instituteName: 'Mock Institute',
  status: 'active',
}));
