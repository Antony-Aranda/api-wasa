import {
  createBot,
  MemoryDB,
  createFlow,
  createProvider,
  addKeyword,
} from "@bot-whatsapp/bot";

import { BaileysProvider, handleCtx } from "@bot-whatsapp/provider-baileys";

const flowBienvenida = addKeyword("hola").addAnswer("Buenas Bienvenido");

const main = async () => {
  const provider = createProvider(BaileysProvider);

  provider.initHttpServer(3002);

  provider.http?.server.post(
    "/send-message",
    handleCtx(async (bot, req, res) => {
      const body = req.body;
      const phone = "51982907418";
      const mesaje = "Hola oso manteqcoso";
      const img = body.mediaUrl;
      await bot.sendMessage(phone, mesaje, {
        media: img,
      });
      res.end("Esto es del server de polka");
    })
  );
  await createBot({
    flow: createFlow([flowBienvenida]),
    database: new MemoryDB(),
    provider,
  });
};

main();
