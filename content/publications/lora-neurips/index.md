---
title: "How Finite-Rank Bottleneck Shape the Low-Rank Adaptation Landscape"
status: published
authors:
  - Long Nguyen-Chi
  - Quynh Nguyen
  - Thanh Nguyen-Cung
  - Binh Nguyen
venue: NeurIPS 2026
date: 2026-09-24
paper_url: https://arxiv.org/pdf/2610.23343
---

## Abstract

Low-rank adaptation (LoRA) has become the standard method for parameter-efficient fine-tuning of large pretrained models, yet theoretical explanations for why low-rank updates suffice remain incomplete. Most existing analyses rely on the Neural Tangent Kernel (NTK) regime, which linearizes the network around the pretrained weights. In this work, we take a different approach that requires no linearization: our key observation is that, once the backbone is frozen, the loss sees each adapted weight matrix only through a finite-rank linear map induced by the frozen activations. Trace-norm regularization then forces the optimizer to pick a low-rank matrix among all matrices that produce the same observed output. This yields global minimizers whose ranks are controlled by the rank of this map, which we call the *bottleneck rank*, rather than the sample size. For multi-head attention, we obtain tighter rank upper bounds by exploiting two additional invariances: row-wise softmax is insensitive to additive row constants in the score matrix, and value updates are observable only after attention weighting and frozen output projection. For the factorized LoRA objective with weight decay, we prove a complementary result on the nonconvex side: after an arbitrarily small generic positive semidefinite perturbation, every first-order stationary point is rank-deficient once the LoRA rank exceeds a threshold determined by the bottleneck rank. Finally, we show that global minimizers of the perturbed objective are near-optimal for the original trace-norm problem, and we provide uniform generalization bounds governed by the spectral structure of the frozen features.

## Research Question

Why can low-rank updates suffice for fine-tuning a frozen model without relying on Neural Tangent Kernel linearization, and what determines the ranks needed by the optimizer?

## What This Paper Does

The paper studies the finite-rank maps through which frozen features expose adapted weights to the loss. It derives rank bounds for regularized updates and attention, analyzes stationary points of factorized LoRA, and gives near-optimality and generalization guarantees.

## My Contribution

- Surveyed related work on low-rank adaptation and finite-rank bottlenecks, verified proofs and modified papers.
