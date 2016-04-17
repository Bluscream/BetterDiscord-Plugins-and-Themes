#Encrypted Text Plugin Info

##Settings

On the settings panel of the plugin you can manage your `<KEYALIAS>`'es.

![Preview](https://i.gyazo.com/54c3e1279f4dd07a863c9711dfa65eb2.gif)

##Chat Commands

Command | Description
----------------|--------------
`/ad`  |  Sends infos how to decrypt into the current channel.
`/o <TEXT>`  |  Hashes `<TEXT>` into BASE64.
`/e <KEYALIAS> <TEXT>`  |  Enrypts `<TEXT>` with the key returned by `<KEYALIAS>` to AES256.

##Example Chat Messages

Command | Emote | Decscription
----------------|--------------|--------------
`/o`  |  <img width="16px" src="https://ptb.discordapp.com/assets/d72f52ce6c418c5c8fd5faac0e8c36ff.svg"/> |  BASE64 hashed text.
`/e`  |  <img width="16px" src="https://ptb.discordapp.com/assets/86c36b8437a0bc80cf310733f54257c2.svg"/>   |  AES256 encrypted text.
 | <img width="16px" src="https://i.gyazo.com/433bbcfd804defd4417f54d83aaa71b3.png"/> |  Broken hash (Cant get decrypted)  |  
