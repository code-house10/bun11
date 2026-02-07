'use client';
import { useState, useEffect } from 'react';
import styles from '../admin.module.css';

interface About {
    title: string;
    description: string;
    image1: string;
    image2: string;
    experience: number;
    feature1Title: string;
    feature1Desc: string;
    feature2Title: string;
    feature2Desc: string;
}

export default function AboutAdmin() {
    const [about, setAbout] = useState<About | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => { fetchData(); }, []);

    async function fetchData() {
        try {
            const res = await fetch('/api/about');
            if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
            const text = await res.text();
            if (!text) {
                setAbout(null);
                return;
            }
            const data = JSON.parse(text);
            setAbout(data);
        } catch (error) {
            console.error('Failed to fetch about data:', error);
        } finally {
            setLoading(false);
        }
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setSaving(true);
        await fetch('/api/about', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(about),
        });
        setSaving(false);
        setMessage('تم حفظ التغييرات بنجاح!');
        setTimeout(() => setMessage(''), 3000);
    }

    if (loading) return <div className={styles.loading}><div className={styles.spinner}></div></div>;
    if (!about) return null;

    return (
        <div>
            {message && (
                <div style={{ background: '#dcfce7', color: '#166534', padding: '15px 20px', borderRadius: '10px', marginBottom: '20px' }}>
                    ✅ {message}
                </div>
            )}

            <div className={styles.card}>
                <div className={styles.cardHeader}>
                    <h2 className={styles.cardTitle}>قسم من نحن</h2>
                </div>

                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.formGroup}>
                        <label className={styles.formLabel}>العنوان الرئيسي</label>
                        <input className={styles.formInput} value={about.title} onChange={(e) => setAbout({ ...about, title: e.target.value })} />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.formLabel}>الوصف</label>
                        <textarea className={styles.formTextarea} value={about.description} onChange={(e) => setAbout({ ...about, description: e.target.value })} />
                    </div>

                    <div className={styles.formRow}>
                        <div className={styles.formGroup}>
                            <label className={styles.formLabel}>رابط الصورة الأولى</label>
                            <input className={styles.formInput} value={about.image1} onChange={(e) => setAbout({ ...about, image1: e.target.value })} />
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.formLabel}>رابط الصورة الثانية</label>
                            <input className={styles.formInput} value={about.image2} onChange={(e) => setAbout({ ...about, image2: e.target.value })} />
                        </div>
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.formLabel}>سنوات الخبرة</label>
                        <input type="number" className={styles.formInput} value={about.experience} onChange={(e) => setAbout({ ...about, experience: parseInt(e.target.value) })} style={{ maxWidth: '150px' }} />
                    </div>

                    <h3 style={{ marginTop: '20px', marginBottom: '15px', fontSize: '1rem', color: '#6c757d' }}>الميزة الأولى</h3>
                    <div className={styles.formRow}>
                        <div className={styles.formGroup}>
                            <label className={styles.formLabel}>العنوان</label>
                            <input className={styles.formInput} value={about.feature1Title} onChange={(e) => setAbout({ ...about, feature1Title: e.target.value })} />
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.formLabel}>الوصف</label>
                            <input className={styles.formInput} value={about.feature1Desc} onChange={(e) => setAbout({ ...about, feature1Desc: e.target.value })} />
                        </div>
                    </div>

                    <h3 style={{ marginTop: '20px', marginBottom: '15px', fontSize: '1rem', color: '#6c757d' }}>الميزة الثانية</h3>
                    <div className={styles.formRow}>
                        <div className={styles.formGroup}>
                            <label className={styles.formLabel}>العنوان</label>
                            <input className={styles.formInput} value={about.feature2Title} onChange={(e) => setAbout({ ...about, feature2Title: e.target.value })} />
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.formLabel}>الوصف</label>
                            <input className={styles.formInput} value={about.feature2Desc} onChange={(e) => setAbout({ ...about, feature2Desc: e.target.value })} />
                        </div>
                    </div>

                    <div style={{ marginTop: '20px' }}>
                        <button type="submit" className={`${styles.btn} ${styles.btnPrimary}`} disabled={saving}>
                            {saving ? 'جاري الحفظ...' : '💾 حفظ التغييرات'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
