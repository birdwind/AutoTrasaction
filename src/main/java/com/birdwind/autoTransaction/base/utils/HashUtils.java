package com.birdwind.autoTransaction.base.utils;

import org.apache.commons.lang3.RandomStringUtils;
import java.math.BigInteger;
import java.security.MessageDigest;
import java.security.SecureRandom;
import java.util.Random;
import java.util.UUID;

public class HashUtils {

    public static String generateMemberNo() {
        return UUID.randomUUID().toString();
    }

    public static String generateUsername() {
        return RandomStringUtils.random(8, true, true);
    }

    public static String generatePassword() {
        return RandomStringUtils.random(6, true, true);
    }

    public static String generateGroupNo() {
        int count = new Random().ints(1, 5, 8).findFirst().orElse(5);
        return RandomStringUtils.random(count, true, true);
    }

    public static String generateRandomString(int length) {
        return RandomStringUtils.random(length, true, true);
    }

    public static String randomMd5() {
        try {
            SecureRandom secureRandom = new SecureRandom();
            String randomNum = Integer.valueOf(secureRandom.nextInt()).toString();
            return md5(randomNum);
        } catch (Exception e) {
            return null;
        }
    }

    public static String md5(String input) {
        try {
            input = input + " " + DateTimeUtils.getCurrentTimestamp() + " " + RandomStringUtils.random(5, true, true);
            MessageDigest md = MessageDigest.getInstance("MD5");
            md.update(input.getBytes());
            return new BigInteger(1, md.digest()).toString(16);
        } catch (Exception e) {
            return null;
        }
    }

    public static String randomSha1() {
        try {
            SecureRandom secureRandom = new SecureRandom();
            String randomNum = Integer.valueOf(secureRandom.nextInt()).toString();
            return sha1(randomNum);
        } catch (Exception e) {
            return null;
        }
    }

    public static String sha1(String input) {
        try {
            MessageDigest sha = MessageDigest.getInstance("SHA-1");
            sha.update(input.getBytes());
            return new BigInteger(1, sha.digest()).toString(16);
        } catch (Exception e) {
            return null;
        }
    }

}
