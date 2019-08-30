const { Client } = require('./index')

const express = require('express');
// const cors = require('cors');
const app = express();

// app.use(cors());

const client = new Client({puppeteer: {headless: true,args: ['--no-sandbox', '--disable-setuid-sandbox']}});
// You can use an existing session and avoid scanning a QR code by adding a "session" object to the client options.
// This object must include WABrowserId, WASecretBundle, WAToken1 and WAToken2.

app.get('/lc/', async (req, res) => {

    console.log(req.query.tour);
    console.log(req.query.phone);

    client.initialize();

    client.on('qr', (qr_img) => {
        res.status(200).json({
            QR_image: qr_img
        })
    });

});

app.listen(3000, function () {
    console.log('Basic NodeJS app listening on port 3000.');
});

// LOGIC
client.on('message', async msg => {
    console.log('MESSAGE RECEIVED', msg);

    if (msg.body == 'box' || msg.body == '#') {
        client.setPrevMessage("main");
        client.sendMessage(msg.from, "*Привет, я коробочка ToDoBox!*\n\n" +
            "Приятно познакомиться!\n" +
            "Я всегда готова ответить на все твои вопросы и буду 24/7 с тобой в чате:)\n" +
            " Расскажи о себе, отправь в ответ соответствующую пункту меню  в ответ на это сообщение\n" +
            " *1* - Я уже счастливый клиент ToDoBox и у меня есть несколько вопросов:)\n" +
            " *2* - Я еще не приобретал коробочку, но хочу и у меня есть несколько вопросов:)\n");
    } else if (client.lastMessage == "main") {
        switch (msg.body){
            case "1":
                client.setPrevMessage("profi");
                client.sendMessage(msg.from,
                    "Привет, я коробочка ToDoBox!" +
                    "\nЯ всегда готова ответить на все твои вопросы и буду 24/7 с тобой в чате:)" +
                    "\nРасскажи что произошло, отправь в ответ соответствующую пункту меню  в ответ на это сообщение" +
                    "\n*1* Что делать, если оплатил коробочку, но не могу найти анкету?" +
                    "\n*2* Как активировать сертификат?" +
                    "\n*3* Что делать, если я не успеваю посетить мероприятия?" +
                    "\n*4*  Что, если событие мне не подходит? " +
                    "\n*4* График работы и как пройти?" +
                    "\n*5* Акции" +
                    "\n*6*  Хочу оставить отзыв или пожелание:)" +
                    "\n*8* Оставить заявку на звонок"
                );
                break;
            case "2":
                client.setPrevMessage("newbie");
                client.sendMessage(msg.from,
                    "Привет, я коробчка ToDoBox!\n" +
                    "\nTo Do Box - это коробочка с впечатлениями! Это 4 или 6 сертификатов на двоих на разные мероприятия. Цена начинается от 990 рублей! Не веришь? А зря!" +
                    "\nЯ готова ответить на все твои вопросы, просто выбирай соответствующую пункту меню в ответ на это сообщение!\n" +
                    "\n*1* Что такое  ToDoBox?" +
                    "\n*2* Срок действия сертификатов? Кто может посещать события?" +
                    "\n*3* Как заказать?" +
                    "\n*4* Как получить коробочку?" +
                    "\n*5* Что, если мне не понравится коробочка?" +
                    "\n*6* График работы и как пройти?" +
                    "\n*7* Подробнее о To Do Box Plus" +
                    "\n*8* Подробнее о подарочном сертификате" +
                    "\n*9* Подробнее о подписке на 3/6 месяцев" +
                    "\n*10* Подробнее о подписке NON STOP" +
                    "\n*11* Акции" +
                    "\n*12* Оставить заявку на звонок"
                );
                break;
            default:
                client.setPrevMessage("main");
                client.sendMessage(msg.from, "Я не смог распознать команду( Нажми *#* чтобы вернуться в главное меню");
        }
    } else if (client.lastMessage == "profi") {
        switch (msg.body) {
            case "1":
                client.sendMessage(msg.from,
                    "*1. Что делать, если оплатил коробочку, но не могу найти анкету?\n" * +
                        "Привет, пожалуйста, проверь папку спам! Бывает случается, что анкеты попадают именно туда!:) Если  анкеты и там не окажется, напиши нам на почту  свой номер телефона info@todobox.ru, скорее всего почта была указана с ошибкой, мы найдем твой заказ по номеру телефона и направим анкету!:)"
                );
                break;
            case "2":
                client.sendMessage(msg.from,
                    "*2. Как активировать сертификат? Трудности при активации*" +
                    "\nЧтобы зарегистрировать сертификат необходимо перейти по ссылке и ввести все данные https://todobox.ru/go" +
                    "\n- Проверь введены ли все цифры и буквы верно." +
                    "\n- Если сертификат электронный, нужно обязательно вводить вручную, а не копировать номер." +
                    "\nЕсли же активация не проходит или ты не получил письма с инструкциями, напиши нам на почту info@todobox.ru номер сертификата, а мы тебе поможем!:)"
                );
                break;
            case "3":
                client.sendMessage(msg.from,
                    "*3. Что делать, если я не успеваю посетить мероприятия?*" +
                    "\nНам очень, жаль что ты не успел посетить все события!" +
                    "\nЕсли в твоей коробочке 4 события, к сожалению, в этой версии нет продления - но всегда можно предъявить неиспользованные билеты и получить скидку 10%" +
                    "\n\nПродление сертификатов возможно в коробочке To Do Box Plus (6 событий) - можно продлить четыре события из шести, напиши нам на почту  info@todobox.ru, какие события ты хотел бы продлить, а мы направим новые билеты! Не забудь про пометочку “Продление по коробочке PLUS”"
                );
                break;
            case "4":
                client.sendMessage(msg.from,
                    "*4. Что, если событие мне не подходит?*" +
                    "\nСамое главное - не грусти, коробочка создана чтобы радовать!" +
                    "\nТак что смело пиши нам на почту info@todobox.ru, а мы отправим список мероприятий для замены!:) "
                );
                break;
            case "5":
                client.sendMessage(msg.from,
                    "*5. График работы и как нас найти?*" +
                    "\nМы находимся по адресу:" +
                    "\nст.м. Площадь Революции/Театральная/ Лубянка , ул. Никольская, 17 (КИК «Славянский»), 1ый этаж  по коридору вдоль окон, первый поворот налево, предпоследняя дверь)" +
                    "\nМаршрут с фото можно посмотреть здесь (ссылка на гугл диск) или в историях в инстаграм"
                );
                break;
            case "6":
                client.sendMessage(msg.from,
                    "*6. Акции*" +
                    "\nЧто же мы для тебя приготовили?" +
                    "\n1. Если Вы собираетесь купить две коробочки или больше, мы выставим Вам индивидуальный счёт на оплату. На каждую последующую коробочку Вы получите скидку 10%! Для этого напишите нам на почту: “Я хочу 2 (или больше) коробочек)”, а мы в ответ отправим ссылку для оплаты" +
                    "\n2. Если ты не успел посетить мероприятия из прошлой коробочки - пришли нам фотографию сертификата, а мы сделаем скидку на покупку коробочки 10%! И пришлем секретную ссылку на оплату со скидкой!:)" +
                    "\n3. Понравились мероприятия? Обязательно делись отзывами в социальных сетях - за каждые две фотографии с #todobox, отметкой нас и нашего партнера мы подарим еще один сертификат!:) " +
                    "\n4. Если вы хотите больше 10 коробочек. Отправьте заявку на почту corporate@todobox.ru " +
                    "\nМы рассчитаем индивидуальную стоимость для вашего заказа."
                );
                break;
            case "7":
                client.sendMessage(msg.from,
                    "*7. Хочу оставить отзыв или пожелание?*"
                );
                break;
            case "8":
                client.sendMessage(msg.from,
                    "*8. Оставить заявку на звонок*"
                );
                break;
            default:
                client.setPrevMessage("main");
                client.sendMessage(msg.from, "Я не смог распознать команду( Нажми *#* чтобы вернуться в главное меню");
        }
    } else if (client.lastMessage == "newbie") {
        switch (msg.body) {
            case "1":
                client.sendMessage(msg.from,
                    "*1) Что такое  ToDoBox?*" +
                    "\nСпасибо за интерес к моей персоне!😇" +
                    "\nВ коробочке вы найдете 4 или 6 (To Do Box PLUS) мероприятий на двоих на самые яркие  события, подобранные индивидуально для Вас! " +
                    "\n🌟Это могут быть мастер-классы, спортивные занятия⚽или развлечения🎉. Например: квест по городу, интеллектуальная игра в кафе, ночные катки, тренировка в батутном центре, джазовый вечер🎷в кафе, концерт, билеты в кино!" +
                    "\nВсе мероприятия подбираются индивидуально!" +
                    "\n📝После оплаты заказа вы получаете на почту анкету, где можете указать желаемый характер мероприятий (более спокойные или активные, интеллектуальные и т.д), а так же отметить возраст и пол человека, который будет посещать мероприятия. " +
                    "\nСостав коробочки остается для Вас сюрпризом💥 до получения, но если что-то окажется совсем не подходящим мы обязательно предложим замену 😇"
                );
                break;
            case "2":
                client.sendMessage(msg.from,
                    "*2) Срок действия сертификатов? Кто может посещать события?*" +
                    "\nВсе сертификаты в коробочке имеют единый срок действия -  30 дней. При заказе коробочки Вы можете выбрать дату начала действия билетов именно с выбранной даты начинается срок действия коробочки. Исключение составляют посещения концертов, показов, спектаклей, - такие мероприятия, как понимаете, имеют фиксированную дату😊. Если дата Вам не подойдет, мы всегда предложим варианты для замены:) Посещать мероприятия всегда можно разными компаниями, тк билеты не именные. "
                );
                break;
            case "3":
                client.sendMessage(msg.from,
                    "*3) Как заказать?*" +
                    "\nЗаказ вы можете оформить на нашем сайте https://todobox.ru/ " +
                    "\nЧтобы коробочка была физическая, на сайте нужно выбрать вариант «подарочная коробочка»🎁."
                );
                break;
            case "4":
                client.sendMessage(msg.from,
                    "*4) Как получить коробочку?*" +
                    "\nЕсть 2 варианта получения коробочки😊:" +
                    "\n- подарочную коробочку можно самостоятельно забрать из нашего офиса или мы отправим коробочку курьерской доставкой💌. Доставка осуществляется в тот же день, если Вы совершили покупку до 17 вечера. После 17.00 доставка осуществляется на следующий день. Стоимость доставки составляет 350-500 рублей (в пределах МКАД) стоимость доставки за МКАД рассчитывается индивидуально🤗." +
                    "\n- электронный формат приходит на почту в день заказа, если он был сделан до 19:00 вечера, если анкета была заполнена после 19:00, коробочка придет к Вам на следующий день с 11 до 20"
                );
                break;
            case "5":
                client.sendMessage(msg.from,
                    "*5) Что, если мне не понравится коробочка?*" +
                    "\nПри получении Вам обязательно расскажут, что внутри! Если Вам не понравится содержимое мы предложим варианты для замены в офисе, при получении электронной коробочки - направим список мероприятия для замены на электронную почту! Если вдруг Вам абсолютно ничего не подойдет мы удивимися, но вернем деньги!:)"
                );
                break;
            case "6":
                client.sendMessage(msg.from,
                    "*6) График работы и как нас найти?*" +
                    "\nМы находимся по адресу:" +
                    "\nст.м. Площадь Революции/Театральная/ Лубянка , ул. Никольская, 17 (КИК «Славянский»), 1ый этаж  по коридору вдоль окон, первый поворот налево, предпоследняя дверь)" +
                    "\nМаршрут с фото можно посмотреть здесь (ссылка на гугл диск) или в историях в инстаграм"
                );
                break;
            case "7":
                client.sendMessage(msg.from,
                    "*7) Подробнее о To Do Box Plus*" +
                    "\n*To Do Box Plus* - это 4+2 супер специальных впечатления! Самые крутые впечатления и мероприятия города, которые мы подберем по твоей анкете! " +
                    "\n*Только в этой версии возможно продление четырех событий на следующий, если ты что то не успел пройти!*" +
                    "\nПодарочная упаковка и бантик на твой выбор идет в подарок! (С днем рождения, маме, любимому и еще + 20 упаковок на выбор)"
                );
                break;
            case "8":
                client.sendMessage(msg.from,
                    "*8) Подробнее о подарочном сертификате*" +
                    "\nПодарочный сертификат - это идеальный вариант для подарка, сертификат действует год с момента покупки! В любой момент обладатель сертификата может обратиться к нам и получить коробочку! Вместе с ним мы определимся с выбором месяца и подборкой впечатлений!:) Подарочный сертификат можно получить на электронную почту или самовывозом из нашего офиса (доплат никаких нет, все зависит от удобства получения)"
                );
                break;
            case "9":
                client.sendMessage(msg.from,
                    "*9) Подробнее о подписке на 3/6 месяцев*" +
                    "\nТри или шесть месяцев крутых впечатлений, каждое на два лица! Каждый месяц новые места!  Ты можешь выбрать любой месяц для получения, переносить и замораживать события! У тебя всегда есть возможность выбора как удобнее получать коробочки - на электронную почту или в подарочном варианте! И да, крутая подарочная упаковка и бантик идет в подарок! " +
                    "\nЕсли подписка будет как подарок, то можно получить первую коробочку по подписке, а на остальные коробочки - подарочный сертификат!"
                );
                break;
            case "10":
                client.sendMessage(msg.from,
                    "*10) Подробнее о подписке NON STOP*" +
                    "\nКаждый месяц получай 4 впечатления на двоих по выгодной цене!" +
                    "\nНе нужно каждый раз заходить на сайт, оплати сейчас и все остальные платежи будут автоматическими + каждый раз новая анкета и классная упаковка в подарок! " +
                    "\n_* - за первую коробочку ты платишь как обычно 1290 за физическую или 990 за электронную,_" +
                    "\n_а дальше - всегда меньше!_"
                );
                break;
            case "11":
                client.sendMessage(msg.from,
                    "*11) Акции*" +
                    "\nЧто же мы для тебя приготовили?" +
                    "\n1. Если Вы собираетесь купить две коробочки или больше, мы выставим Вам индивидуальный счёт на оплату. На каждую последующую коробочку Вы получите скидку 10%! Для этого напишите нам на почту: “Я хочу 2 (или больше) коробочек)”, а мы в ответ отправим ссылку для оплаты" +
                    "\n2. Если ты не успел посетить мероприятия из прошлой коробочки - пришли нам фотографию сертификата, а мы сделаем скидку на покупку коробочки 10%! И пришлем секретную ссылку на оплату со скидкой!:)" +
                    "\n3. Понравились мероприятия? Обязательно делись отзывами в социальных сетях - за каждые две фотографии с #todobox, отметкой нас и нашего партнера мы подарим еще один сертификат!:) " +
                    "\n4. Если вы хотите больше 10 коробочек. Отправьте заявку на почту corporate@todobox.ru " +
                    "\nМы рассчитаем индивидуальную стоимость для вашего заказа."
                );
                break;
            case "12":
                client.sendMessage(msg.from,
                    "*12) Оставить заявку на звонок*"
                );
                break;
            default:
                client.setPrevMessage("main");
                client.sendMessage(msg.from, "Я не смог распознать команду( Нажми *#* чтобы вернуться в главное меню");
        }
    } else {
        client.setPrevMessage("main");
        client.sendMessage(msg.from, "Я не смог распознать команду( \n\nНажми *#* чтобы вернуться в главное меню");
    }











});