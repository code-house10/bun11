'use client';
import { useState, useEffect } from 'react';
import styles from '../admin.module.css';

interface BlogPost {
    id: string;
    title: string;
    excerpt: string;
    content: string;
    image: string;
    author: string;
    published: boolean;
    createdAt: string;
}

export default function BlogAdmin() {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editing, setEditing] = useState<BlogPost | null>(null);
    const [form, setForm] = useState({ title: '', excerpt: '', content: '', image: '', author: 'المدير', published: true });

    useEffect(() => { fetchData(); }, []);

    async function fetchData() {
        try {
            const res = await fetch('/api/blog');
            const data = await res.json();
            setPosts(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error('Failed to fetch blog posts:', error);
            setPosts([]);
        }
        setLoading(false);
    }

    function openModal(item?: BlogPost) {
        if (item) {
            setEditing(item);
            setForm({ title: item.title, excerpt: item.excerpt, content: item.content, image: item.image, author: item.author, published: item.published });
        } else {
            setEditing(null);
            setForm({ title: '', excerpt: '', content: '', image: '', author: 'المدير', published: true });
        }
        setShowModal(true);
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (editing) {
            await fetch(`/api/blog/${editing.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
        } else {
            await fetch('/api/blog', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
        }
        setShowModal(false);
        fetchData();
    }

    async function handleDelete(id: string) {
        if (confirm('هل أنت متأكد من حذف هذا العنصر؟')) {
            await fetch(`/api/blog/${id}`, { method: 'DELETE' });
            fetchData();
        }
    }

    if (loading) return <div className={styles.loading}><div className={styles.spinner}></div></div>;

    return (
        <div>
            <div className={styles.card}>
                <div className={styles.cardHeader}>
                    <h2 className={styles.cardTitle}>المدونة ({posts.length})</h2>
                    <button className={`${styles.btn} ${styles.btnPrimary}`} onClick={() => openModal()}>+ إضافة مقال</button>
                </div>

                {posts.length === 0 ? (
                    <div className={styles.emptyState}><p>لا توجد مقالات. أضف أول مقال!</p></div>
                ) : (
                    <table className={styles.table}>
                        <thead><tr><th>الصورة</th><th>العنوان</th><th>الكاتب</th><th>الحالة</th><th>الإجراءات</th></tr></thead>
                        <tbody>
                            {posts.map((item) => (
                                <tr key={item.id}>
                                    <td><img src={item.image} alt={item.title} /></td>
                                    <td>{item.title}</td>
                                    <td>{item.author}</td>
                                    <td><span style={{ color: item.published ? '#22c55e' : '#f59e0b' }}>{item.published ? '✓ منشور' : '⏳ مسودة'}</span></td>
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
                            <h3 className={styles.modalTitle}>{editing ? 'تعديل المقال' : 'إضافة مقال جديد'}</h3>
                            <button className={styles.modalClose} onClick={() => setShowModal(false)}>×</button>
                        </div>
                        <form onSubmit={handleSubmit} className={styles.form}>
                            <div className={styles.formGroup}>
                                <label className={styles.formLabel}>العنوان</label>
                                <input className={styles.formInput} value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
                            </div>
                            <div className={styles.formGroup}>
                                <label className={styles.formLabel}>الملخص</label>
                                <textarea className={styles.formTextarea} value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} required style={{ minHeight: '80px' }} />
                            </div>
                            <div className={styles.formGroup}>
                                <label className={styles.formLabel}>المحتوى</label>
                                <textarea className={styles.formTextarea} value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} required style={{ minHeight: '200px' }} />
                            </div>
                            <div className={styles.formRow}>
                                <div className={styles.formGroup}>
                                    <label className={styles.formLabel}>رابط الصورة</label>
                                    <input className={styles.formInput} value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} required />
                                </div>
                                <div className={styles.formGroup}>
                                    <label className={styles.formLabel}>الكاتب</label>
                                    <input className={styles.formInput} value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })} />
                                </div>
                            </div>
                            <div className={styles.formGroup}>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                                    <input type="checkbox" checked={form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })} />
                                    <span className={styles.formLabel} style={{ margin: 0 }}>نشر المقال</span>
                                </label>
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
