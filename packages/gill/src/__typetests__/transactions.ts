/* eslint-disable @typescript-eslint/ban-ts-comment */

import type { Address } from "@solana/addresses";
import type { ITransactionMessageWithFeePayerSigner, KeyPairSigner } from "@solana/signers";

import {
  BaseTransactionMessage,
  ITransactionMessageWithFeePayer,
  TransactionMessageWithBlockhashLifetime,
} from "@solana/transaction-messages";
import { IInstruction } from "@solana/instructions";

import { createTransaction } from "../core/transactions";

// [DESCRIBE] createTransaction
{
  const feePayer = null as unknown as Address;
  const signer = null as unknown as KeyPairSigner;
  const latestBlockhash =
    null as unknown as TransactionMessageWithBlockhashLifetime["lifetimeConstraint"];

  const ix = null as unknown as IInstruction;

  // Legacy transactions
  {
    createTransaction({
      version: "legacy",
      feePayer: feePayer,
      instructions: [ix],
    }) satisfies BaseTransactionMessage<"legacy"> & ITransactionMessageWithFeePayer;

    createTransaction({
      version: "legacy",
      feePayer: signer,
      instructions: [ix],
    }) satisfies BaseTransactionMessage<"legacy"> & ITransactionMessageWithFeePayerSigner;

    createTransaction({
      version: "legacy",
      feePayer: feePayer,
      instructions: [ix],
      // @ts-expect-error Should not have a Lifetime
    }) satisfies TransactionMessageWithBlockhashLifetime;

    createTransaction({
      version: "legacy",
      feePayer: signer,
      instructions: [ix],
      // @ts-expect-error Should not have a Lifetime
    }) satisfies TransactionMessageWithBlockhashLifetime;

    // Should be legacy with a Lifetime and Signer
    createTransaction({
      version: "legacy",
      feePayer: signer,
      instructions: [ix],
      latestBlockhash,
    }) satisfies BaseTransactionMessage<"legacy"> &
      TransactionMessageWithBlockhashLifetime &
      ITransactionMessageWithFeePayerSigner;

    // Should be legacy with a Lifetime and address (aka non Signer)
    createTransaction({
      version: "legacy",
      feePayer: feePayer,
      instructions: [ix],
      latestBlockhash,
    }) satisfies BaseTransactionMessage<"legacy"> &
      TransactionMessageWithBlockhashLifetime &
      ITransactionMessageWithFeePayer;
  }

  // Version 0 transactions
  {
    createTransaction({
      version: 0,
      feePayer: feePayer,
      instructions: [ix],
    }) satisfies BaseTransactionMessage<0> & ITransactionMessageWithFeePayer;

    createTransaction({
      version: 0,
      feePayer: signer,
      instructions: [ix],
    }) satisfies BaseTransactionMessage<0> & ITransactionMessageWithFeePayerSigner;

    createTransaction({
      version: 0,
      feePayer: feePayer,
      instructions: [ix],
      // @ts-expect-error Should not have a Lifetime
    }) satisfies TransactionMessageWithBlockhashLifetime;

    createTransaction({
      version: 0,
      feePayer: signer,
      instructions: [ix],
      // @ts-expect-error Should not have a Lifetime
    }) satisfies TransactionMessageWithBlockhashLifetime;

    // Should be legacy with a Lifetime and Signer
    createTransaction({
      version: 0,
      feePayer: signer,
      instructions: [ix],
      latestBlockhash,
    }) satisfies BaseTransactionMessage<0> &
      TransactionMessageWithBlockhashLifetime &
      ITransactionMessageWithFeePayerSigner;

    // Should be legacy with a Lifetime and address (aka non Signer)
    createTransaction({
      version: 0,
      feePayer: feePayer,
      instructions: [ix],
      latestBlockhash,
    }) satisfies BaseTransactionMessage<0> &
      TransactionMessageWithBlockhashLifetime &
      ITransactionMessageWithFeePayer;
  }
}
