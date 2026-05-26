---
title: Batch Normalization
# date: 2026-05-26
url: 2026/05/26/neural-network/batch-norm
tags: 
 - Batch Norm 
_build:
  list: never
  render: always
---

## 1. Motivation 

Deep Neural Networks are commonly trained using SGD on mini-batches:
$$
\Theta = \arg \min_{\Theta} \frac{1}{N}\sum_{i=1}^{N}\ell(x_i,\Theta)
$$

The gradient is approximated using a mini-batch:

$$
\frac{1}{m}\sum_{i=1}^{m}\frac{\partial \ell(x_i,\Theta)}{\partial \Theta}
$$

Although SGD is effective, training deep networks is difficult because:
- careful learning-rate tuning is required,
- parameter initialization is sensitive,
- the input distribution of each layer changes continuously as previous layers update.

The paper refers to this phenomenon **Internal Covariate Shift**: The change in the distribution of internal activations during training.

---

### 1.1 Problem with Sigmoid / Saturating Nonlinearities

Consider a layer:

$$
z = g(Wu+b)
$$

where:

$$
g(x)=\frac{1}{1+e^{-x}}
$$

When $|x|$ becomes large $g'(x)\rightarrow 0 $ which causes vanishing gradients. Since \(x = Wu+b\) depends on all preceding layers, parameter updates continuously shift the distribution of \(x\), pushing many activations into saturation and slowing training.

This issue becomes worse as the network depth increases.

---

### 1.2 Main Idea of BatchNorm

If the distribution of layer inputs remains stable:
- optimization becomes easier,
- gradients become more stable,
- training becomes faster.

BatchNorm therefore:
- normalizes activations,
- keeps mean ≈ 0 and variance ≈ 1,
- reduces Internal Covariate Shift.

Additional benefits:
- allows larger learning rates,
- reduces sensitivity to initialization,
- improves gradient flow,
- acts as regularization,
- reduces the need for Dropout.

---

## 2. From Whitening to BatchNorm

Previous work showed that training is faster when inputs are **whitened**:
- zero mean,
- unit variance,
- decorrelated.

Full whitening requires computing:
$$
\text{Cov}[x] = \mathbb{E}[xx^T]-\mathbb{E}[x]\mathbb{E}[x]^T
$$
and
$$
\text{Cov}[x]^{-1/2}(x-E[x])
$$

This is:
- computationally expensive,
- difficult to differentiate,
- impractical for SGD.

BatchNorm therefore adopts a simpler alternative.

---

## 3. How Batch Normalization Works

### 3.1 Normalize Each Feature Independently

Instead of jointly whitening the entire vector, BN normalizes each dimension independently. Given:
$$
x=(x^{(1)},...,x^{(d)})
$$

and each dimension is normalized as:

$$
\hat{x}^{(k)} = \frac{x^{(k)}-\mathbb{E}[x^{(k)}]} {\sqrt{\text{Var}[x^{(k)}]}}
$$

---

### 3.2 Preserving Representation Power

Simply normalizing activations may reduce the network’s representational capacity.

To solve this, BN introduces two learnable parameters:

$$
y^{(k)} =  \gamma^{(k)}\hat{x}^{(k)} + \beta^{(k)}
$$

where:
- \(\gamma\): scaling parameter,
- \(\beta\): shifting parameter.

If needed, the original activations can be recovered by:

$$
\gamma^{(k)}=\sqrt{\text{Var}[x^{(k)}]} \quad \text{and} \quad \beta^{(k)}=\mathbb{E}[x^{(k)}]
$$


Thus, BatchNorm can represent the identity transform.

---

## 4. BatchNorm with Mini-Batches

In SGD, it is impractical to compute statistics over the entire dataset at every step. Instead, BatchNorm uses mini-batch statistics. Given a mini-batch:

$$
B=\\{x_1,...,x_m\\}
$$

**Mini-Batch Mean**: 
\(
\mu_B = \frac{1}{m}\sum_{i=1}^{m}x_i
\)

**Mini-Batch Variance**:
\(
\sigma_B^2 = \frac{1}{m}\sum_{i=1}^{m}(x_i-\mu_B)^2
\)

**Normalize**: 
\(
\hat{x}_i = \frac{x_i-\mu_B} {\sqrt{\sigma_B^2+\epsilon}}
\)
where \(\epsilon\) prevents division by zero.

**Scale + Shift:**
$
y_i = \gamma \hat{x}_i+\beta.
$ 
This transformation is called: **Batch Normalizing Transform**

---

## 5. Why BatchNorm is Differentiable

Normalization depends on:
- the current sample,
- the entire mini-batch.

Formally:

$$
\hat{x}=Norm(x,X)
$$

Backpropagation must compute:

$$
\frac{\partial Norm(x,X)}{\partial x} \quad \text{and} \quad \frac{\partial Norm(x,X)}{\partial X}
$$

Ignoring these dependencies can cause unstable training and parameter explosion. BatchNorm incorporates normalization directly into the computational graph so gradients can flow through the normalization operation correctly.

---

## 6. Training vs Inference

### Training

During training, BN uses mini-batch statistics
$
\mu_B,\sigma_B^2
$
and the normalized activations have mean $\approx$ 0 and variance $\approx$ 1.

---

### Inference

During inference, mini-batch statistics are no longer used. Instead, BN uses population statistics:

$$
\hat{x} = \frac{x-\mathbb{E}[x]}{\sqrt{\text{Var}[x]+\epsilon}}
$$

Variance is estimated as:

$$
\text{Var}[x] = \frac{m}{m-1}\mathbb{E}_B[\sigma_B^2]
$$

Inference therefore becomes a deterministic linear transformation.

---

## 7. BatchNorm in Fully Connected and CNN Layers

### 7.1 Fully Connected Layers

Original layer:

$$
z=g(Wu+b)
$$

With BatchNorm:

$$
z=g(BN(Wu))
$$

The bias term \(b\) can often be removed because mean subtraction cancels its effect.

---

### 7.2 Convolutional Networks

In CNNs:
- normalization is applied per feature map,
- all spatial locations within the same channel share statistics.

Given batch size \(m\) and feature map size \(p\times q\), the effective batch size becomes:

$$
m' = mpq
$$

Each feature map has one \(\gamma^{(k)}\) and one \(\beta^{(k)}\).

---

## 8. BatchNorm Enables Higher Learning Rates

The paper shows:

$$
BN(Wu)=BN((aW)u)
$$

Scaling the weights does not change the normalized output.

Additionally:

$$
\frac{\partial BN((aW)u)}{\partial u} = \frac{\partial BN(Wu)}{\partial u}
$$

and:

$$
\frac{\partial BN((aW)u)}{\partial (aW)} =\frac{1}{a} \frac{\partial BN(Wu)}{\partial W}
$$

Therefore, gradient propagation becomes less sensitive to parameter scale.

As a result:
- larger learning rates become possible,
- training becomes more stable,
- exploding/vanishing gradients are reduced.

---

## 9. BatchNorm and Gradient Propagation

The paper conjectures that BN helps Jacobians maintain singular values close to 1.

Suppose

$$
\hat{z}=F(\hat{x})
$$

and

$$
F(\hat{x})\approx J\hat{x}
$$

Then:

$$
I = Cov[\hat{z}] = JCov[\hat{x}]J^T = JJ^T
$$

Hence, the singular values of \(J\) are close to 1. This helps:
- preserve gradient magnitudes,
- stabilize backpropagation.
