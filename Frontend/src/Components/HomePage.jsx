import React from 'react'
import '../Css/homePage.css';
const HomePage = () => {

    


  return (
    <>
    <div className="video">
    </div>
    <div></div>
    <p className="hometext">
        <br /><br /><br />

        <marquee><hr /></marquee>
        <h1>ברוך הבא לאתר שלי </h1>
        <h1>Ahuva Multimedia</h1>
        <h2>תודה שבחרתם בנו </h2>
        <marquee dir="ltr"><hr /></marquee>
        <div className="element6">שאלות נפוצות</div>
        <div className="element7">תודה שבחרת בי להנציח את הרגעים שלך</div>

        <div className="div2">
            <details className="test1" title="שאלות נפוצות">
                <summary>שאלות נפוצות</summary>
                <section className="test1">
                    ש. מה אורך ממוצע של טריילרים?<br />
                    ת. ממוצע 3-4 דקות
                </section>
                <section className="test1">
                    ש. איך אני יכולה להגיד לך מה אני רוצה?<br />
                    ת. אפשר לשלוח סרטוט/ צילום מסך
                </section>
                <section className="test1">
                    ש. תוך כמה זמן הקליפ/ המצגת מוכנה?<br />
                    ת . עד 5 ימי עסקים, אפשרי גם פחות (אם ממש דחוף יש לסכם זאת מראש- לעיתים דרוש תוספת תשלום/ ללא תיקונים)
                </section>
                <section className="test1">
                    ש. איך אני מקבלת את הסרטון הסופי?<br />
                    ת. אני שולחת אותו בג'מבו מיייל / גוגל דרייב / לקחת באונקי
                </section>
                <section className="test1">
                    ש. איך משלמים?<br />
                    ת. בהעברה בנקאית או מזומן
                </section>
                <section className="test1">
                    ש. לבת מצוות- את גם מסריטה?<br />
                    ת. המחיר לא כולל הסרטה במידה ותרצו אתן הצעת מחיר נפרדת להרטה, לגבי אולפן אני לא מקליטה אבל אוכל לכוון למישהי טובה.
                </section>
                <section className="test1">
                    ש. אפשר לשלב גם תמונות וגם הסרטות?<br />
                    ת. אפשר ואפילו מומלץ.
                </section>
                <section className="test1">
                    ש. איך אני יכולה לדעת מה אני אוהבת?<br />
                    ת. את יכולה לבקש דוגמאות, אני אשלח לך בשמחה וכך תוכלי לקבל רעיונות וסגנונות ולבחור.
                </section>
                <section className="test1">
                    <textarea placeholder="-רציתי לשאול-"></textarea>
                    <br />
                    <input type="submit" id="sub" value="שלח"></input>
                </section>
            </details>
        </div>
    </p>

    <h5>כאן תמיד לשירותכם </h5>
    </>
  )
}

export default HomePage