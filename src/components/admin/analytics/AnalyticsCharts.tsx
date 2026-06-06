'use client';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, Legend,
  ComposedChart, Line
} from 'recharts';

const COLORS_A = ['#8b5cf6', '#f97316', '#ec4899', '#3b82f6', '#10b981'];
const COLORS_B = ['#14b8a6', '#f43f5e', '#8b5cf6', '#eab308', '#64748b'];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 rounded-xl shadow-lg border border-gray-100 font-medium">
        <p className="text-gray-900 mb-1 font-bold">{label || payload[0].name}</p>
        {payload.map((p: any, i: number) => (
          <p key={i} style={{ color: p.color || p.fill }}>
            {p.name}: {p.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

// 1. Browsers Pie Chart
export function BrowserChart({ data }: { data: any[] }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie data={data} cx="50%" cy="50%" outerRadius={80} dataKey="value" stroke="none">
          {data.map((_, index) => <Cell key={`cell-${index}`} fill={COLORS_B[index % COLORS_B.length]} />)}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}

// 2. Top Pages Bar Chart
export function TopPagesChart({ data }: { data: any[] }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f3f4f6" />
        <XAxis type="number" hide />
        <YAxis dataKey="path" type="category" width={120} tick={{fontSize: 12}} axisLine={false} tickLine={false} />
        <Tooltip content={<CustomTooltip />} />
        <Bar dataKey="views" name="Pageviews" fill="#8b5cf6" radius={[0, 4, 4, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

// 3. Operating Systems Bar Chart
export function OSChart({ data }: { data: any[] }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
        <XAxis dataKey="name" tick={{fontSize: 12}} axisLine={false} tickLine={false} />
        <YAxis hide />
        <Tooltip content={<CustomTooltip />} />
        <Bar dataKey="value" name="Users" fill="#ec4899" radius={[4, 4, 0, 0]} barSize={40}>
          {data.map((_, index) => <Cell key={`cell-${index}`} fill={COLORS_A[index % COLORS_A.length]} />)}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

// 4. Referrers Donut Chart
export function ReferrerChart({ data }: { data: any[] }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie data={data} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value" stroke="none">
          {data.map((_, index) => <Cell key={`cell-${index}`} fill={COLORS_A[index % COLORS_A.length]} />)}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}

// 5. Country Bar Chart
export function CountryChart({ data }: { data: any[] }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f3f4f6" />
        <XAxis type="number" hide />
        <YAxis dataKey="name" type="category" width={80} tick={{fontSize: 12}} axisLine={false} tickLine={false} />
        <Tooltip content={<CustomTooltip />} />
        <Bar dataKey="value" name="Sessions" fill="#10b981" radius={[0, 4, 4, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

// 6. Engagement Composed Chart (Views vs Visitors)
export function EngagementChart({ data }: { data: any[] }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <ComposedChart data={data} margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
        <CartesianGrid stroke="#f3f4f6" vertical={false} />
        <XAxis dataKey="date" tick={{fontSize: 12}} axisLine={false} tickLine={false} />
        <YAxis hide />
        <Tooltip content={<CustomTooltip />} />
        <Bar dataKey="views" name="Pageviews" barSize={20} fill="#8b5cf6" radius={[4, 4, 0, 0]} />
        <Line type="monotone" dataKey="visitors" name="Unique Visitors" stroke="#f97316" strokeWidth={3} dot={false} />
      </ComposedChart>
    </ResponsiveContainer>
  );
}
