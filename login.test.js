// login.test.js
require('edgedriver');
const { Builder, By, Key, until } = require('selenium-webdriver');

async function pruebaLoginSpeakly() {
  const driver = await new Builder().forBrowser('edge').build();

  try {
    // 1. Abrir la página de login
    await driver.get('http://localhost:5173/login');

    // 2. Esperar que el campo de usuario esté disponible
    await driver.wait(until.elementLocated(By.css('input[type="text"]')), 5000);
    await driver.findElement(By.css('input[type="text"]')).sendKeys('JuanMarc', Key.TAB);

    // 3. Ingresar la clave
    await driver.findElement(By.css('input[type="password"]')).sendKeys('1234', Key.RETURN);

    // 4. Esperar redirección al conversor (ruta "/")
    await driver.wait(until.urlIs('http://localhost:5173/'), 5000);

    // 5. Verificar que el título "Speakly" esté presente
    const titulo = await driver.findElement(By.css('h1')).getText();
    if (titulo.includes('Speakly')) {
      console.log('✅ Login exitoso y redirección confirmada');
    } else {
      console.log('❌ Login fallido o redirección incorrecta');
    }

  } catch (error) {
    console.error('❌ Error durante la prueba:', error);
  } finally {
    await driver.quit();
  }
}

pruebaLoginSpeakly();
