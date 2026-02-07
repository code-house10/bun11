'use client';
import { useState, useEffect } from 'react';
import styles from '../admin.module.css';

interface Settings {
    siteName: string;
    phone: string;
    email: string;
    address: string;
    facebook?: string;
    twitter?: string;
    instagram?: string;
    whatsapp?: string;
}

export default function SettingsAdmin() {
    const [settings, setSettings] = useState<Settings | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => { fetchData(); }, []);

    async function fetchData() {
        try {
            const res = await fetch('/api/settings');
            if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
            const text = await res.text();
            if (!text) {
                setSettings(null);
                return;
            }
            const data = JSON.parse(text);
            setSettings(data);
        } catch (error) {
            console.error('Failed to fetch settings:', error);
        } finally {
            setLoading(false);
        }
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setSaving(true);
        await fetch('/api/settings', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(settings),
        });
        setSaving(false);
        setMessage('تم حفظ الإعدادات بنجاح!');
        setTimeout(() => setMessage(''), 3000);
    }

    if (loading) return <div className={styles.loading}><div className={styles.spinner}></div></div>;
    if (!settings) return null;

    return (
        <div>
            {message && (
                <div style={{ background: '#dcfce7', color: '#166534', padding: '15px 20px', borderRadius: '10px', marginBottom: '20px' }}>
                    ✅ {message}
                </div>
            )}

            <div className={styles.card}>
                <div className={styles.cardHeader}>
                    <h2 className={styles.cardTitle}>إعدادات الموقع</h2>
                </div>

                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.formGroup}>
                        <label className={styles.formLabel}>اسم الموقع</label>
                        <input className={styles.formInput} value={settings.siteName} onChange={(e) => setSettings({ ...settings, siteName: e.target.value })} />
                    </div>

                    <h3 style={{ marginTop: '20px', marginBottom: '15px', fontSize: '1rem', color: '#6c757d' }}>معلومات التواصل</h3>

                    <div className={styles.formRow}>
                        <div className={styles.formGroup}>
                            <label className={styles.formLabel}>رقم الهاتف</label>
                            <input className={styles.formInput} value={settings.phone} onChange={(e) => setSettings({ ...settings, phone: e.target.value })} />
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.formLabel}>البريد الإلكتروني</label>
                            <input type="email" className={styles.formInput} value={settings.email} onChange={(e) => setSettings({ ...settings, email: e.target.value })} />
                        </div>
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.formLabel}>العنوان</label>
                        <input className={styles.formInput} value={settings.address} onChange={(e) => setSettings({ ...settings, address: e.target.value })} />
                    </div>

                    <h3 style={{ marginTop: '20px', marginBottom: '15px', fontSize: '1rem', color: '#6c757d' }}>روابط التواصل الاجتماعي</h3>

                    <div className={styles.formRow}>
                        <div className={styles.formGroup}>
                            <label className={styles.formLabel}>فيسبوك</label>
                            <input className={styles.formInput} value={settings.facebook || ''} onChange={(e) => setSettings({ ...settings, facebook: e.target.value })} placeholder="https://facebook.com/..." />
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.formLabel}>تويتر</label>
                            <input className={styles.formInput} value={settings.twitter || ''} onChange={(e) => setSettings({ ...settings, twitter: e.target.value })} placeholder="https://twitter.com/..." />
                        </div>
                    </div>

                    <div className={styles.formRow}>
                        <div className={styles.formGroup}>
                            <label className={styles.formLabel}>إنستغرام</label>
                            <input className={styles.formInput} value={settings.instagram || ''} onChange={(e) => setSettings({ ...settings, instagram: e.target.value })} placeholder="https://instagram.com/..." />
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.formLabel}>واتساب</label>
                            <input className={styles.formInput} value={settings.whatsapp || ''} onChange={(e) => setSettings({ ...settings, whatsapp: e.target.value })} placeholder="+966500000000" />
                        </div>
                    </div>

                    <div style={{ marginTop: '20px' }}>
                        <button type="submit" className={`${styles.btn} ${styles.btnPrimary}`} disabled={saving}>
                            {saving ? 'جاري الحفظ...' : '💾 حفظ الإعدادات'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
