import CryptoJS from "crypto-js";
import dotenv from "dotenv";

dotenv.config();

const { RESPONSE_AESKEY } = process.env;

export const encryptPayload = (data: string) => {
  return CryptoJS.AES.encrypt(data, RESPONSE_AESKEY!).toString();
};

export const decryptRequest = (data: string) => {
  return CryptoJS.AES.decrypt(data, RESPONSE_AESKEY!).toString(
    CryptoJS.enc.Utf8
  );
};

export const encryptToken = (data: string) => {
  return CryptoJS.AES.encrypt(data, RESPONSE_AESKEY!).toString();
};

export const decryptToken = (data: string) => {
  return CryptoJS.AES.decrypt(data, RESPONSE_AESKEY!).toString(
    CryptoJS.enc.Utf8
  );
};

function binaryToString(str: string) {
  // Removes the spaces from the binary string
  str = str.trim().replace(/\s+/g, "");
  // Pretty (correct) print binary (add a space every 8 characters)
  str = str.match(/.{1,8}/g)!.join(" ");

  let newBinary = str.split(" ");
  let binaryCode = [];

  for (let i = 0; i < newBinary.length; i++) {
    binaryCode.push(String.fromCharCode(parseInt(newBinary[i], 2)));
  }
  return binaryCode.join("");
}

export const encryptSPay = function (arg: string) {
  //IbsBridge

  let keyHex = CryptoJS.enc.Utf8.parse(binaryToString(process.env.KEY_HEX!));
  let vectorHex = CryptoJS.enc.Utf8.parse(
    binaryToString(process.env.VECTOR_HEX!)
  );

  let encrypted = CryptoJS.TripleDES.encrypt(arg.trim(), keyHex, {
    iv: vectorHex,
  });
  return encrypted.toString();
};

export const decryptSpay = function (encoded: string) {
  //IbsBridge
  try {
    // direct decrypt ciphertext
    let keyHex = CryptoJS.enc.Utf8.parse(binaryToString(process.env.KEY_HEX!));
    let vectorHex = CryptoJS.enc.Utf8.parse(
      binaryToString(process.env.VECTOR_HEX!)
    );

    let decrypted = CryptoJS.TripleDES.decrypt(encoded.trim(), keyHex, {
      iv: vectorHex,
    });

    return decrypted.toString(CryptoJS.enc.Utf8);
  } catch (error) {
    console.log("Decryption failed", error);
    return false;
  }
};
