'use client';
import { useState, useEffect } from 'react';
import styles from '../admin.module.css';

interface Testimonial {
    id: string;
    name: string;
    role: string;
    text: string;
    image: string;
    rating: number;
    order: number;
}

export default function TestimonialsAdmin() {
    const [items, setItems] = useState<Testimonial[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editing, setEditing] = useState<Testimonial | null>(null);
    const [form, setForm] = useState({ name: '', role: '', text: '', image: '', rating: 5, order: 0 });

    useEffect(() => { fetchData(); }, []);

    async function fetchData() {
        try {
            const res = await fetch('/api/testimonials');
            const data = await res.json();
            setItems(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error('Failed to fetch testimonials:', error);
            setItems([]);
        }
        setLoading(false);
    }

    function openModal(item?: Testimonial) {
        if (item) {
            setEditing(item);
            setForm({ name: item.name, role: item.role, text: item.text, image: item.image, rating: item.rating, order: item.order });
        } else {
            setEditing(null);
            setForm({ name: '', role: '', text: '', image: '', rating: 5, order: items.length });
        }
        setShowModal(true);
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (editing) {
            await fetch(`/api/testimonials/${editing.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
        } else {
            await fetch('/api/testimonials', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
        }
        setShowModal(false);
        fetchData();
    }

    async function handleDelete(id: string) {
        if (confirm('هل أنت متأكد من حذف هذا العنصر؟')) {
            await fetch(`/api/testimonials/${id}`, { method: 'DELETE' });
            fetchData();
        }
    }

    if (loading) return <div className={styles.loading}><div className={styles.spinner}></div></div>;

    return (
        <div>
            <div className={styles.card}>
                <div className={styles.cardHeader}>
                    <h2 className={styles.cardTitle}>آراء العملاء ({items.length})</h2>
                    <button className={`${styles.btn} ${styles.btnPrimary}`} onClick={() => openModal()}>+ إضافة رأي</button>
                </div>

                {items.length === 0 ? (
                    <div className={styles.emptyState}><p>لا توجد آراء. أضف أول رأي!</p></div>
                ) : (
                    <table className={styles.table}>
                        <thead><tr><th>الصورة</th><th>الاسم</th><th>المنصب</th><th>التقييم</th><th>الإجراءات</th></tr></thead>
                        <tbody>
                            {items.map((item) => (
                                <tr key={item.id}>
                                    <td><img src={item.image} alt={item.name} /></td>
                                    <td>{item.name}</td>
                                    <td>{item.role}</td>
                                    <td>{'⭐'.repeat(item.rating)}</td>
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
                            <h3 className={styles.modalTitle}>{editing ? 'تعديل الرأي' : 'إضافة رأي جديد'}</h3>
                            <button className={styles.modalClose} onClick={() => setShowModal(false)}>×</button>
                        </div>
                        <form onSubmit={handleSubmit} className={styles.form}>
                            <div className={styles.formRow}>
                                <div className={styles.formGroup}>
                                    <label className={styles.formLabel}>الاسم</label>
                                    <input className={styles.formInput} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
                                </div>
                                <div className={styles.formGroup}>
                                    <label className={styles.formLabel}>المنصب</label>
                                    <input className={styles.formInput} value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} required />
                                </div>
                            </div>
                            <div className={styles.formGroup}>
                                <label className={styles.formLabel}>الرأي</label>
                                <textarea className={styles.formTextarea} value={form.text} onChange={(e) => setForm({ ...form, text: e.target.value })} required />
                            </div>
                            <div className={styles.formRow}>
                                <div className={styles.formGroup}>
                                    <label className={styles.formLabel}>رابط الصورة</label>
                                    <input className={styles.formInput} value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} required />
                                </div>
                                <div className={styles.formGroup}>
                                    <label className={styles.formLabel}>التقييم (1-5)</label>
                                    <input type="number" min="1" max="5" className={styles.formInput} value={form.rating} onChange={(e) => setForm({ ...form, rating: parseInt(e.target.value) })} />
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
