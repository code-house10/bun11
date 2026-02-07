'use client';
import { useState, useEffect } from 'react';
import styles from '../admin.module.css';

interface HeroSlide {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    image: string;
    order: number;
}

export default function HeroAdmin() {
    const [slides, setSlides] = useState<HeroSlide[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editing, setEditing] = useState<HeroSlide | null>(null);
    const [form, setForm] = useState({ title: '', subtitle: '', description: '', image: '', order: 0 });

    useEffect(() => {
        fetchSlides();
    }, []);

    async function fetchSlides() {
        try {
            const res = await fetch('/api/hero');
            const data = await res.json();
            setSlides(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error('Failed to fetch slides:', error);
            setSlides([]);
        }
        setLoading(false);
    }

    function openModal(slide?: HeroSlide) {
        if (slide) {
            setEditing(slide);
            setForm({ title: slide.title, subtitle: slide.subtitle, description: slide.description, image: slide.image, order: slide.order });
        } else {
            setEditing(null);
            setForm({ title: '', subtitle: '', description: '', image: '', order: slides.length });
        }
        setShowModal(true);
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (editing) {
            await fetch(`/api/hero/${editing.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });
        } else {
            await fetch('/api/hero', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });
        }
        setShowModal(false);
        fetchSlides();
    }

    async function handleDelete(id: string) {
        if (confirm('هل أنت متأكد من حذف هذا العنصر؟')) {
            await fetch(`/api/hero/${id}`, { method: 'DELETE' });
            fetchSlides();
        }
    }

    if (loading) return <div className={styles.loading}><div className={styles.spinner}></div></div>;

    return (
        <div>
            <div className={styles.card}>
                <div className={styles.cardHeader}>
                    <h2 className={styles.cardTitle}>السلايدر الرئيسي ({slides.length})</h2>
                    <button className={`${styles.btn} ${styles.btnPrimary}`} onClick={() => openModal()}>
                        + إضافة سلايد جديد
                    </button>
                </div>

                {slides.length === 0 ? (
                    <div className={styles.emptyState}>
                        <p>لا توجد سلايدات. أضف أول سلايد!</p>
                    </div>
                ) : (
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>الصورة</th>
                                <th>العنوان</th>
                                <th>العنوان الفرعي</th>
                                <th>الترتيب</th>
                                <th>الإجراءات</th>
                            </tr>
                        </thead>
                        <tbody>
                            {slides.map((slide) => (
                                <tr key={slide.id}>
                                    <td><img src={slide.image} alt={slide.title} /></td>
                                    <td>{slide.title}</td>
                                    <td>{slide.subtitle}</td>
                                    <td>{slide.order}</td>
                                    <td>
                                        <div className={styles.actions}>
                                            <button className={`${styles.btn} ${styles.btnSecondary} ${styles.btnSmall}`} onClick={() => openModal(slide)}>تعديل</button>
                                            <button className={`${styles.btn} ${styles.btnDanger} ${styles.btnSmall}`} onClick={() => handleDelete(slide.id)}>حذف</button>
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
                            <h3 className={styles.modalTitle}>{editing ? 'تعديل السلايد' : 'إضافة سلايد جديد'}</h3>
                            <button className={styles.modalClose} onClick={() => setShowModal(false)}>×</button>
                        </div>
                        <form onSubmit={handleSubmit} className={styles.form}>
                            <div className={styles.formGroup}>
                                <label className={styles.formLabel}>العنوان</label>
                                <input className={styles.formInput} value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
                            </div>
                            <div className={styles.formGroup}>
                                <label className={styles.formLabel}>العنوان الفرعي</label>
                                <input className={styles.formInput} value={form.subtitle} onChange={(e) => setForm({ ...form, subtitle: e.target.value })} required />
                            </div>
                            <div className={styles.formGroup}>
                                <label className={styles.formLabel}>الوصف</label>
                                <textarea className={styles.formTextarea} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required />
                            </div>
                            <div className={styles.formGroup}>
                                <label className={styles.formLabel}>رابط الصورة</label>
                                <input className={styles.formInput} value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} required />
                            </div>
                            <div className={styles.formGroup}>
                                <label className={styles.formLabel}>الترتيب</label>
                                <input type="number" className={styles.formInput} value={form.order} onChange={(e) => setForm({ ...form, order: parseInt(e.target.value) })} />
                            </div>
                            <div className={styles.modalFooter}>
                                <button type="submit" className={`${styles.btn} ${styles.btnPrimary}`}>{editing ? 'حفظ التغييرات' : 'إضافة'}</button>
                                <button type="button" className={`${styles.btn} ${styles.btnSecondary}`} onClick={() => setShowModal(false)}>إلغاء</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
