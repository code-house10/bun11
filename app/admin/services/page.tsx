'use client';
import { useState, useEffect } from 'react';
import styles from '../admin.module.css';

interface Service {
    id: string;
    title: string;
    description: string;
    icon: string;
    features: string;
    order: number;
}

export default function ServicesAdmin() {
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editing, setEditing] = useState<Service | null>(null);
    const [form, setForm] = useState({ title: '', description: '', icon: '', features: '', order: 0 });

    useEffect(() => { fetchData(); }, []);

    async function fetchData() {
        try {
            const res = await fetch('/api/services');
            const data = await res.json();
            setServices(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error('Failed to fetch services:', error);
            setServices([]);
        }
        setLoading(false);
    }

    function openModal(item?: Service) {
        if (item) {
            setEditing(item);
            setForm({ title: item.title, description: item.description, icon: item.icon, features: item.features, order: item.order });
        } else {
            setEditing(null);
            setForm({ title: '', description: '', icon: '🚚', features: '[]', order: services.length });
        }
        setShowModal(true);
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        const featuresArray = form.features.split('\n').filter(f => f.trim());
        const payload = { ...form, features: featuresArray };

        if (editing) {
            await fetch(`/api/services/${editing.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });
        } else {
            await fetch('/api/services', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });
        }
        setShowModal(false);
        fetchData();
    }

    async function handleDelete(id: string) {
        if (confirm('هل أنت متأكد من حذف هذا العنصر؟')) {
            await fetch(`/api/services/${id}`, { method: 'DELETE' });
            fetchData();
        }
    }

    if (loading) return <div className={styles.loading}><div className={styles.spinner}></div></div>;

    return (
        <div>
            <div className={styles.card}>
                <div className={styles.cardHeader}>
                    <h2 className={styles.cardTitle}>الخدمات ({services.length})</h2>
                    <button className={`${styles.btn} ${styles.btnPrimary}`} onClick={() => openModal()}>+ إضافة خدمة</button>
                </div>

                {services.length === 0 ? (
                    <div className={styles.emptyState}><p>لا توجد خدمات. أضف أول خدمة!</p></div>
                ) : (
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>الأيقونة</th>
                                <th>العنوان</th>
                                <th>الوصف</th>
                                <th>الترتيب</th>
                                <th>الإجراءات</th>
                            </tr>
                        </thead>
                        <tbody>
                            {services.map((item) => (
                                <tr key={item.id}>
                                    <td style={{ fontSize: '2rem' }}>{item.icon}</td>
                                    <td>{item.title}</td>
                                    <td>{item.description.substring(0, 50)}...</td>
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
                            <h3 className={styles.modalTitle}>{editing ? 'تعديل الخدمة' : 'إضافة خدمة جديدة'}</h3>
                            <button className={styles.modalClose} onClick={() => setShowModal(false)}>×</button>
                        </div>
                        <form onSubmit={handleSubmit} className={styles.form}>
                            <div className={styles.formRow}>
                                <div className={styles.formGroup}>
                                    <label className={styles.formLabel}>العنوان</label>
                                    <input className={styles.formInput} value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
                                </div>
                                <div className={styles.formGroup}>
                                    <label className={styles.formLabel}>الأيقونة (إيموجي)</label>
                                    <input className={styles.formInput} value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })} required />
                                </div>
                            </div>
                            <div className={styles.formGroup}>
                                <label className={styles.formLabel}>الوصف</label>
                                <textarea className={styles.formTextarea} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required />
                            </div>
                            <div className={styles.formGroup}>
                                <label className={styles.formLabel}>المميزات (سطر لكل ميزة)</label>
                                <textarea className={styles.formTextarea} value={form.features} onChange={(e) => setForm({ ...form, features: e.target.value })} placeholder="نقل آمن ومحترف&#10;تغليف مجاني&#10;ضمان شامل" />
                            </div>
                            <div className={styles.formGroup}>
                                <label className={styles.formLabel}>الترتيب</label>
                                <input type="number" className={styles.formInput} value={form.order} onChange={(e) => setForm({ ...form, order: parseInt(e.target.value) })} />
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
