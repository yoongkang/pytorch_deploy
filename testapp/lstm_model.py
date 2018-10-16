from torch.functional import F
import torch
import torchtext
import dill as pickle


def get_embedding_matrix():
    with open('./embedding_matrix.dat', 'rb') as f:
        embedding_matrix = pickle.load(f)
    return embedding_matrix


class LSTMModel(torch.nn.Module):
    def __init__(self):
        super().__init__()
        self.enc = torch.nn.Embedding.from_pretrained(get_embedding_matrix(), freeze=True)
        self.rnn = torch.nn.LSTM(input_size=50, hidden_size=30, batch_first=True, num_layers=2, bidirectional=True)
        self.fc1 = torch.nn.Linear(60, 50)
        self.fc2 = torch.nn.Linear(50, 6)

        self.hidden = None

    def init_hidden(self, batch_size):
        return (torch.zeros(4, batch_size, 30), torch.zeros(4, batch_size, 30))

    def forward(self, x):
        x = self.enc(x)
        if self.hidden is None:
            self.hidden = self.init_hidden(x.shape[0])
        x, self.hidden = self.rnn(x, self.hidden)
        x, _ = torch.max(x, dim=1)
        x = self.fc1(x)
        x = F.relu(x)
        x = self.fc2(x)
        return torch.sigmoid(x)


def get_model():
    loaded_model = LSTMModel()
    loaded_model.load_state_dict(torch.load('./deploy.dat'))
    return loaded_model

def get_vocab():
    with open('./vocab.dat', 'rb') as f:
        vocab = pickle.load(f)
    return vocab


def get_textfield():
    return torchtext.data.Field(
        sequential=True,
        tokenize='spacy',
        fix_length=100,
        lower=True,
    )


def predict(model, X):
    with torch.no_grad():
        model.eval()
        model.hidden = model.init_hidden(len(X))
        return model(X)


def split_text(text):
    from nltk.tokenize import TextTilingTokenizer
    import itertools
    tokenizer = TextTilingTokenizer(w=5)
    texts = [t for t in text.split("\n\n")]
    try:
        texts = [t for t in text.split("\n\n")]
        returntest = [itertools.chain(tokenizer.tokenize(t)) for t in texts]
        return returntest
    except ValueError:
        return texts


def rank_text(text):
    model = get_model()
    TEXT = get_textfield()
    tok = TEXT.tokenize(text)
    padded = TEXT.pad([tok])[0]
    vocab = get_vocab()
    nums = [vocab[s.lower()] for s in padded]
    output = predict(model, torch.tensor([nums]))
    scores = [x.item() for x in output[0]]
    labels = [
        'toxic', 'severe_toxic',
        'obscene', 'threat',
        'insult', 'identity_hate',
    ]
    return dict(zip(labels, scores))
