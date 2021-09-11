package com.birdwind.springBootInit.base.utils;

import org.apache.commons.lang3.StringUtils;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.codec.Hex;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import javax.crypto.BadPaddingException;
import javax.crypto.Cipher;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import javax.crypto.spec.SecretKeySpec;

public class CipherUtils {

    private static final String KEY = "18WlCQGzvsWqgQBib0sOaZfFiu";

    public static String encryptByBlowFish(String text) {
        try {
            Cipher cipher = getBlowFishCipher(Cipher.ENCRYPT_MODE);
            assert cipher != null : " cipher is not ready ";
            byte[] decrypted = cipher.doFinal(text.getBytes());

            return new String(Hex.encode(decrypted));
        } catch (BadPaddingException | IllegalBlockSizeException | IllegalArgumentException e) {
            return StringUtils.EMPTY;
        }
    }

    public static String decryptByBlowFish(String text) {
        try {
            Cipher cipher = getBlowFishCipher(Cipher.DECRYPT_MODE);
            assert cipher != null : " cipher is not ready ";
            byte[] decrypted = cipher.doFinal(Hex.decode(text));

            return new String(decrypted);
        } catch (BadPaddingException | IllegalBlockSizeException | IllegalArgumentException e) {
            return StringUtils.EMPTY;
        }
    }

    public static String bcrypt(String input) {
        BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
        return bCryptPasswordEncoder.encode(input);
    }

    public static boolean bcryptMatch(String raw, String encoded) {
        BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
        return bCryptPasswordEncoder.matches(raw, encoded);
    }

    private static Cipher getBlowFishCipher(int mode) {
        try {
            byte[] keyBytes = KEY.getBytes();

            SecretKeySpec ks = new SecretKeySpec(keyBytes, "Blowfish");

            Cipher cipher = Cipher.getInstance("Blowfish");
            cipher.init(mode, ks);

            return cipher;
        } catch (NoSuchAlgorithmException | NoSuchPaddingException | InvalidKeyException e) {
            return null;
        }
    }

}
