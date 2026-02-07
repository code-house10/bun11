'use client';
import { useState, useEffect } from 'react';
import styles from '../admin.module.css';

interface Stat {
    id: string;
    value: number;
    suffix: string;
    label: string;
    order: number;
}

export default function StatsAdmin() {
    const [stats, setStats] = useState<Stat[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editing, setEditing] = useState<Stat | null>(null);
    const [form, setForm] = useState({ value: 0, suffix: '', label: '', order: 0 });

    useEffect(() => { fetchData(); }, []);

    async function fetchData() {
        try {
            const res = await fetch('/api/stats');
            const data = await res.json();
            setStats(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error('Failed to fetch stats:', error);
            setStats([]);
        }
        setLoading(false);
    }

    function openModal(item?: Stat) {
        if (item) {
            setEditing(item);
            setForm({ value: item.value, suffix: item.suffix, label: item.label, order: item.order });
        } else {
            setEditing(null);
            setForm({ value: 0, suffix: '+', label: '', order: stats.length });
        }
        setShowModal(true);
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (editing) {
            await fetch(`/api/stats/${editing.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
        } else {
            await fetch('/api/stats', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
        }
        setShowModal(false);
        fetchData();
    }

    async function handleDelete(id: string) {
        if (confirm('هل أنت متأكد من حذف هذا العنصر؟')) {
            await fetch(`/api/stats/${id}`, { method: 'DELETE' });
            fetchData();
        }
    }

    if (loading) return <div className={styles.loading}><div className={styles.spinner}></div></div>;

    return (
        <div>
            <div className={styles.card}>
                <div className={styles.cardHeader}>
                    <h2 className={styles.cardTitle}>الإحصائيات ({stats.length})</h2>
                    <button className={`${styles.btn} ${styles.btnPrimary}`} onClick={() => openModal()}>+ إضافة إحصائية</button>
                </div>

                {stats.length === 0 ? (
                    <div className={styles.emptyState}><p>لا توجد إحصائيات. أضف أول إحصائية!</p></div>
                ) : (
                    <table className={styles.table}>
                        <thead><tr><th>القيمة</th><th>اللاحقة</th><th>التسمية</th><th>الترتيب</th><th>الإجراءات</th></tr></thead>
                        <tbody>
                            {stats.map((item) => (
                                <tr key={item.id}>
                                    <td style={{ fontWeight: 'bold', fontSize: '1.25rem' }}>{item.value}</td>
                                    <td>{item.suffix}</td>
                                    <td>{item.label}</td>
                                    <td>{item.order}</td>
                                    <td>
                                        <div className={styles.actions}>
                                            <button className={`${styles.btn} ${styles.btnSecondary} ${styles.btnSmall}`} onClick={() => openModal(item)}>تعديل</button>
                                            <button className={`${styles.btn} ${styles.btnDanger} ${styles.btnSmall}`} onClick={() => handleDelete(item.id)}>حذف</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            {showModal && (
                <div className={styles.modal}>
                    <div className={styles.modalContent}>
                        <div className={styles.modalHeader}>
                            <h3 className={styles.modalTitle}>{editing ? 'تعديل الإحصائية' : 'إضافة إحصائية جديدة'}</h3>
                            <button className={styles.modalClose} onClick={() => setShowModal(false)}>×</button>
                        </div>
                        <form onSubmit={handleSubmit} className={styles.form}>
                            <div className={styles.formRow}>
                                <div className={styles.formGroup}>
                                    <label className={styles.formLabel}>القيمة</label>
                                    <input type="number" className={styles.formInput} value={form.value} onChange={(e) => setForm({ ...form, value: parseInt(e.target.value) })} required />
                                </div>
                                <div className={styles.formGroup}>
                                    <label className={styles.formLabel}>اللاحقة (مثل: +, K, %)</label>
                                    <input className={styles.formInput} value={form.suffix} onChange={(e) => setForm({ ...form, suffix: e.target.value })} required />
                                </div>
                            </div>
                            <div className={styles.formRow}>
                                <div className={styles.formGroup}>
                                    <label className={styles.formLabel}>التسمية</label>
                                    <input className={styles.formInput} value={form.label} onChange={(e) => setForm({ ...form, label: e.target.value })} required />
                                </div>
                                <div className={styles.formGroup}>
                                    <label className={styles.formLabel}>الترتيب</label>
                                    <input type="number" className={styles.formInput} value={form.order} onChange={(e) => setForm({ ...form, order: parseInt(e.target.value) })} />
                                </div>
                            </div>
                            <div className={styles.modalFooter}>
                                <button type="submit" className={`${styles.btn} ${styles.btnPrimary}`}>{editing ? 'حفظ' : 'إضافة'}</button>
                                <button type="button" className={`${styles.btn} ${styles.btnSecondary}`} onClick={() => setShowModal(false)}>إلغاء</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
