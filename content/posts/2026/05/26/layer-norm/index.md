---
title: Layer Normalization
# date: 2026-05-26
url: 2026/05/26/layer-norm
tags:
 - Layer Norm
build:
  list: never
  render: always
---

## 1. Motivation

Deep neural networks are commonly trained using SGD, but optimization becomes difficult because:
- learning rates are sensitive,
- initialization matters,
- hidden-layer activation distributions continuously change during training.

Batch Normalization was introduced to reduce this issue, but it depends on mini-batch statistics, which causes problems for:
- small batch sizes,
- online learning,
- recurrent neural networks (RNNs).

Layer Normalization was proposed to remove this dependency on mini-batches.

---

## 2. Background

Consider a feed-forward neural network layer:

$$
a_i^l = (w_i^l)^T h^l
$$

and:

$$
h_i^{l+1} = f(a_i^l + b_i^l)
$$

where:
- \(w_i^l\): incoming weights,
- \(b_i^l\): bias,
- \(f(\cdot)\): nonlinearity.

BatchNorm normalizes each neuron using statistics computed across the mini-batch:

$$
\bar a_i^l =
\frac{g_i^l}{\sigma_i^l}(a_i^l-\mu_i^l)
$$

with:

$$
\mu_i^l = \mathbb{E}_{x\sim P(x)}[a_i^l]
$$

and:

$$
\sigma_i^l =
\sqrt{
\mathbb{E}_{x\sim P(x)}
[(a_i^l-\mu_i^l)^2]
}
$$

In practice, these expectations are estimated using the current mini-batch.

---

## 3. Main Idea of Layer Normalization

Instead of normalizing across training examples, LayerNorm normalizes across hidden units within the same layer. For a layer with \(H\) hidden units:

$$
\mu^l =
\frac{1}{H}
\sum_{i=1}^{H} a_i^l
$$

and:

$$
\sigma^l =
\sqrt{
\frac{1}{H}
\sum_{i=1}^{H}
(a_i^l-\mu^l)^2
}
$$

The normalized hidden unit becomes:

$$
h_i =
f\left(
\frac{g_i}{\sigma_i}(a_i-\mu_i)+b_i
\right)
$$

where, \(g_i\) is the learnable gain and \(b_i\) is the learnable bias.

Unlike BatchNorm:
- different training cases have different statistics,
- all hidden units in the same layer share the same normalization statistics,
- no mini-batch statistics are required.

Therefore, LayerNorm:
- works with batch size \(1\),
- works naturally for RNNs,
- behaves identically during training and inference.

---

## 4. Layer Normalization in RNNs

For a standard RNN:

$$
a_t = W_{hh}h_{t-1} + W_{xh}x_t
$$

LayerNorm applies normalization at every time-step:

$$
h_t =
f\left(
g \odot
\frac{a_t-\mu_t}{\sigma_t}
+b
\right)
$$

where:

$$
\mu_t = \frac{1}{H} \sum_{i=1}^{H} a_i^t \qquad \text{and} \qquad \sigma_t = \sqrt{\frac{1}{H}\sum_{i=1}^{H}(a_i^t-\mu_t)^2}
$$

This stabilizes hidden-state dynamics and helps reduce exploding gradients and vanishing gradients. Unlike BatchNorm, LayerNorm does not require separate statistics for every time-step and large mini-batches.

---

## 5. General LayerNorm Formulation

We defines LayerNorm as:

$$
LN(z;\alpha,\beta) = \frac{z-\mu}{\sigma}\odot \alpha + \beta
$$
with:
$$
\mu = \frac{1}{D}\sum_{i=1}^{D} z_i \qquad \text{and} \qquad \sigma = \sqrt{\frac{1}{D}\sum{i=1}^{D}(z_i-\mu)^2}
$$


where \(\alpha\) is gain parameter, \(\beta\) is bias parameter.

---

## 6. LayerNorm for LSTMs

Standard LSTM equations:

$$
\begin{bmatrix}
f_t \\\\
i_t \\\\
o_t \\\\
g_t
\end{bmatrix} = W_h h_{t-1} + W_x x_t + b
$$

$$
c_t = \sigma(f_t)\odot c_{t-1} + \sigma(i_t)\odot \tanh(g_t), \qquad h_t =
\sigma(o_t)\odot \tanh(c_t)
$$

Layer-normalized LSTM:

$$
\begin{bmatrix}
f_t \\\\
i_t \\\\
o_t \\\\
g_t
\end{bmatrix}
= LN(W_h h_{t-1};\alpha_1,\beta_1) + LN(W_x x_t;\alpha_2,\beta_2) + b
$$

$$
c_t = \sigma(f_t)\odot c_{t-1} + \sigma(i_t)\odot \tanh(g_t), \qquad h_t = \sigma(o_t)\odot \tanh(LN(c_t;\alpha_3,\beta_3))
$$

---

## 7. LayerNorm for GRUs

Standard GRU:
$$ 
\begin{bmatrix}
z_t \\\\
r_t
\end{bmatrix}
= W_hh_{t-1} + W_xx_t
$$

$$
\hat h_t = \tanh( W_x x_t + \sigma(r_t)\odot(Uh_{t-1})), \qquad h_t = (1-\sigma(z_t))h{t-1} + \sigma(z_t)\hat h_t
$$

Layer-normalized GRU:

$$
\begin{bmatrix}
z_t \\\\
r_t
\end{bmatrix}
= LN(W_h h_{t-1};\alpha_1,\beta_1) + LN(W_x x_t;\alpha_2,\beta_2)
$$

$$
\hat h_t = \tanh(LN(W_x x_t;\alpha_3,\beta_3) + \sigma(r_t)\odot LN(Uh_{t-1};\alpha_4,\beta_4)), \qquad h_t = (1-\sigma(z_t))h_{t-1} + \sigma(z_t)\hat h_t
$$

---

## 8. Invariance Properties
LayerNorm is invariant to:
- scaling the entire weight matrix,
- shifting all incoming weights,
- rescaling individual training cases.

Specifically,
$$
W' = \delta W + \mathbf{1}\gamma^T
$$
produces the same output

$$
h' = f\left(\frac{g}{\sigma'}(W'x-\mu')+b\right) = h
$$

LayerNorm is also invariant to re-scaling an input example $ x' = \delta x $ because:

$$
h_i' = f\left(\frac{g_i}{\delta\sigma}(\delta w_i^Tx-\delta\mu)+b_i\right) = h_i
$$

---

## 9. Geometric Interpretation

The paper studies learning through the Fisher Information Matrix. The local distance between nearby parameter settings is approximated by:

$$
ds^2 = D_{KL} (P(y|x;\theta) \parallel P(y|x;\theta+\delta)) \approx \frac12 \delta^T F(\theta)\delta
$$

where:

$$
F(\theta) = \mathbb{E}\left[ \frac{\partial \log P(y|x;\theta)}{\partial \theta}\cdot\frac{\partial \log P(y|x;\theta)^T}{\partial \theta} \right]
$$

The paper argues that normalization stabilizes learning because:
- curvature becomes more controlled,
- gradients become less sensitive to parameter scaling,
- large weight norms implicitly reduce effective learning rates.

---

## 11. Limitation on CNNs

LayerNorm is less effective for convolutional networks because: 
- hidden units in CNN feature maps do not share similar statistics,
- boundary pixels behave differently from center pixels.

BatchNorm performed better than LayerNorm in CNN experiments.

---

## 12. Conclusion

Layer Normalization:
- normalizes across hidden units instead of across the batch,
- removes dependency on mini-batch statistics,
- works naturally for RNNs,
- stabilizes hidden-state dynamics,
- improves gradient flow,
- accelerates training,
- is robust for small batch sizes and online learning.

LayerNorm is especially useful for:
- recurrent neural networks,
- long sequence modeling,
- small mini-batch training.