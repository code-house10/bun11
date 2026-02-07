'use client';
import styles from './CTASection.module.css';

export default function CTASection() {
    return (
        <section id="contact" className={styles.cta}>
            <div className={styles.overlay}></div>
            <div className={styles.container}>
                <div className={styles.content}>
                    <div className={styles.sectionLabel}>
                        <span className={styles.labelLine}></span>
                        <span>تواصل معنا</span>
                    </div>
                    <h2 className={styles.title}>هل أنت مستعد لنقل أثاثك؟</h2>
                    <p className={styles.description}>
                        احصل على عرض سعر مجاني الآن. فريقنا جاهز لمساعدتك في أي وقت.
                    </p>
                    <div className={styles.buttons}>
                        <a href="tel:+966500000000" className={styles.phoneBtn}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                            </svg>
                            <span>+966 50 000 0000</span>
                        </a>
                        <a href="#" className={styles.quoteBtn}>
                            احصل على عرض سعر
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M19 12H5M12 19l-7-7 7-7" />
                            </svg>
                        </a>
                    </div>
                </div>

                <div className={styles.contactForm}>
                    <h3>اطلب عرض سعر مجاني</h3>
                    <form>
                        <div className={styles.formRow}>
                            <input type="text" placeholder="الاسم الكامل" required />
                            <input type="tel" placeholder="رقم الجوال" required />
                        </div>
                        <div className={styles.formRow}>
                            <input type="text" placeholder="مدينة النقل من" required />
                            <input type="text" placeholder="مدينة النقل إلى" required />
                        </div>
                        <select required>
                            <option value="">نوع الخدمة</option>
                            <option value="home">نقل أثاث منزلي</option>
                            <option value="office">نقل أثاث مكتبي</option>
                            <option value="storage">تخزين</option>
                            <option value="packing">تغليف فقط</option>
                        </select>
                        <textarea placeholder="تفاصيل إضافية (اختياري)" rows={3}></textarea>
                        <button type="submit" className={styles.submitBtn}>
                            إرسال الطلب
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M22 2L11 13" />
                                <path d="M22 2L15 22l-4-9-9-4 20-7z" />
                            </svg>
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}
