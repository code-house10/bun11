'use client';
import { useState, useEffect } from 'react';
import styles from '../admin.module.css';

interface Project {
    id: string;
    title: string;
    category: string;
    image: string;
    description?: string;
    order: number;
}

export default function ProjectsAdmin() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editing, setEditing] = useState<Project | null>(null);
    const [form, setForm] = useState({ title: '', category: '', image: '', description: '', order: 0 });

    useEffect(() => { fetchData(); }, []);

    async function fetchData() {
        try {
            const res = await fetch('/api/projects');
            const data = await res.json();
            setProjects(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error('Failed to fetch projects:', error);
            setProjects([]);
        }
        setLoading(false);
    }

    function openModal(item?: Project) {
        if (item) {
            setEditing(item);
            setForm({ title: item.title, category: item.category, image: item.image, description: item.description || '', order: item.order });
        } else {
            setEditing(null);
            setForm({ title: '', category: '', image: '', description: '', order: projects.length });
        }
        setShowModal(true);
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (editing) {
            await fetch(`/api/projects/${editing.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
        } else {
            await fetch('/api/projects', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
        }
        setShowModal(false);
        fetchData();
    }

    async function handleDelete(id: string) {
        if (confirm('هل أنت متأكد من حذف هذا العنصر؟')) {
            await fetch(`/api/projects/${id}`, { method: 'DELETE' });
            fetchData();
        }
    }

    if (loading) return <div className={styles.loading}><div className={styles.spinner}></div></div>;

    return (
        <div>
            <div className={styles.card}>
                <div className={styles.cardHeader}>
                    <h2 className={styles.cardTitle}>المشاريع ({projects.length})</h2>
                    <button className={`${styles.btn} ${styles.btnPrimary}`} onClick={() => openModal()}>+ إضافة مشروع</button>
                </div>

                {projects.length === 0 ? (
                    <div className={styles.emptyState}><p>لا توجد مشاريع. أضف أول مشروع!</p></div>
                ) : (
                    <table className={styles.table}>
                        <thead><tr><th>الصورة</th><th>العنوان</th><th>التصنيف</th><th>الترتيب</th><th>الإجراءات</th></tr></thead>
                        <tbody>
                            {projects.map((item) => (
                                <tr key={item.id}>
                                    <td><img src={item.image} alt={item.title} /></td>
                                    <td>{item.title}</td>
                                    <td>{item.category}</td>
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
                            <h3 className={styles.modalTitle}>{editing ? 'تعديل المشروع' : 'إضافة مشروع جديد'}</h3>
                            <button className={styles.modalClose} onClick={() => setShowModal(false)}>×</button>
                        </div>
                        <form onSubmit={handleSubmit} className={styles.form}>
                            <div className={styles.formRow}>
                                <div className={styles.formGroup}>
                                    <label className={styles.formLabel}>العنوان</label>
                                    <input className={styles.formInput} value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
                                </div>
                                <div className={styles.formGroup}>
                                    <label className={styles.formLabel}>التصنيف</label>
                                    <input className={styles.formInput} value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} required />
                                </div>
                            </div>
                            <div className={styles.formGroup}>
                                <label className={styles.formLabel}>رابط الصورة</label>
                                <input className={styles.formInput} value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} required />
                            </div>
                            <div className={styles.formGroup}>
                                <label className={styles.formLabel}>الوصف</label>
                                <textarea className={styles.formTextarea} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
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
