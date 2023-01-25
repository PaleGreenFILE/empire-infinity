"use client";
import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";

function generateUserUUID() {
  // Génération d'un UUID pour l'utilisateur
  return uuidv4();
}
function generateUniqueUserId() {
  // Générer un User Id unique de 5 - 6 caractères
  const min = 10000;
  const max = 999999;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function generateUniqueToken() {
  // Générer un jeton unique de 32 caractères
  return (
    Math.random().toString(36).substring(2, 34) +
    Math.random().toString(36).substring(2, 34)
  );
}
function generateAffiliateLink(userId: number) {
  //Définir l'url de votre service d'affiliation
  const affiliateService = "https://empire-infinity.vercel.app/en/register";
  //Générer un token unique
  const token = generateUniqueToken();
  //Créer lien d'affiliation unique
  return `${affiliateService}?token=${token}&affid=` + userId;
}
export function useGenerateData() {
  const [data, setData] = useState({
    uuid: "",
    token: "",
    userId: 0,
    link: "",
  });
  useEffect(() => {
    const refreshGenerateData = setInterval(() => {
      const uuid = generateUserUUID();
      const token = generateUniqueToken();
      const userId = generateUniqueUserId();
      const link = generateAffiliateLink(userId);
      setData({ uuid, token, userId, link });
    }, 3000);
    return () => clearInterval(refreshGenerateData);
  }, []);
  return data;
}
